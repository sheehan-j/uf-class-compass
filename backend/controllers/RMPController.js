const Instructor = require('../model/Instructor');

exports.updateRMPData = async (req, res) => {
  try {
    console.log('RMP data update initiated.');
    let instructors = [];
    if (req.query?.update_all) {
      instructors = await Instructor.find({});
    } else if (req.query?.instructor) {
      const instructor = await Instructor.findOne({
        name: req.query.instructor,
      });
      if (!instructor)
        return res.status(400).json({ error: 'Instructor not found.' });
      instructors.push(instructor);
    } else {
      return res.status(400).json({
        error:
          'Query param instructor containing instructor name or update_all set to true must be provided.',
      });
    }

    const rmpData = [];

    const { spawn } = require('child_process');
    const promises = [];
    let updates = 0;
    let total = instructors.length;

    instructors.forEach((instructor) => {
      // Create a promise for each Python script execution
      const promise = new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [
          './util/rmp.py',
          instructor.name,
        ]); // Path to Python script

        pythonProcess.stdout.on('data', (data) => {
          if (data != 'null\n') {
            const split = data.toString().split('\n');

            let formattedData = {
              instructor: instructor._id,
              rmpId: split[0],
              department: split[1],
              school: split[2],
              rating: split[3],
              difficulty: split[4],
              numRatings: split[5],
              wouldTakeAgain: split[6] == 'N/A' ? null : split[6],
            };

            if (split[6] !== 'N/A') {
              formattedData = { ...formattedData, wouldTakeAgain: split[6] };
            }

            rmpData.push(formattedData);
            console.log(`Python API request completed (${++updates}/${total})`);
          } else {
            console.log(
              `Python API request completed (returned null) (${++updates}/${total})`
            );
          }
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python script error: ${data.toString()}`);
          reject(
            `*****FAIL: Aborted update due to Python script error: ${data.toString()}`
          );
        });

        pythonProcess.on('close', (code) => {
          if (code === 0) {
            resolve(); // Resolve the promise on successful completion
          } else {
            reject(`*****FAIL: Python script exited with code ${code}`);
          }
        });
      });

      // Add the promise to the array
      promises.push(promise);
    });

    await Promise.all(promises);

    console.log(JSON.stringify(rmpData));

    await Instructor.updateMany({}, { $set: { rmpData: null } }); // Delete all existing records

    // Once all python script executions are successfully made, update the DB
    const dbPromises = [];
    updates = 0;
    total = rmpData.length;
    rmpData.forEach((rmp) => {
      const promise = new Promise(async (resolve, reject) => {
        try {
          const id = rmp.instructor;
          console.log(id);
          delete rmp.instructor;
          await Instructor.updateOne({ _id: id }, { $set: { rmpData: rmp } });
          console.log(
            `MongoDB create command completed (${++updates}/${total})`
          );
          resolve();
        } catch (err) {
          console.log('**** FAIL: Failed to create RMP record.');
          reject(
            `Could not create RMP object for instructor ${rmp.instructor}`
          );
        }
      });
      dbPromises.push(promise);
    });

    await Promise.all(dbPromises);

    console.log('*****SUCCESS: RMP data update complete.');
    return res.status(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Internal server error: ${err}` });
  }
};
