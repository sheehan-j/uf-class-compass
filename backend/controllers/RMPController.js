const Instructor = require("../model/Instructor");

exports.updateRMPData = async (req, res) => {
	try {
		console.log("RMP data update initiated.");
		let instructors = [];
		if (req.query?.update_all) {
			if (req.query?.begin && req.query?.end) {
				console.log(`Retrieving instructors from index ${req.query.begin} to ${req.query.end}...`);
			} else {
				console.log(`Retrieving ALL instructors from MongoDB...`);
			}
			instructors = await Instructor.find({});
		} else if (req.query?.instructor) {
			const instructor = await Instructor.findOne({ name: req.query.instructor });
			if (!instructor) return res.status(400).json({ error: "Instructor not found." });
			instructors.push(instructor);
		} else {
			console.log(
				"***FAIL: Query param instructor containing instructor name or update_all set to true must be provided."
			);
			return res.status(400).json({
				error: "Query param instructor containing instructor name or update_all set to true must be provided.",
			});
		}
		if (req.query?.begin && req.query?.end) {
			instructors = instructors.slice(req.query.begin, req.query.end);
		}
		console.log("Instructor retrieval from MongoDB complete.");

		const rmpData = [];

		const { spawn } = require("child_process");
		const promises = [];
		let apiReqIndex = 0;
		let total = instructors.length;
		let apiReqErrors = 0;

		console.log("Beginning Python requests...");
		for (const instructor of instructors) {
			await new Promise(async (resolve, reject) => {
				setTimeout(async () => {
					console.log(`Python API request started (${++apiReqIndex}/${total})`);
					const pythonProcess = spawn("python3", ["./util/rmp.py", instructor.name]); // Path to Python script

					pythonProcess.stdout.on("data", (data) => {
						if (data != "null\n") {
							const split = data.toString().split("\n");

							let formattedData = {
								instructor: instructor._id,
								rmpId: split[0],
								department: split[1],
								school: split[2],
								rating: split[3],
								difficulty: split[4],
								numRatings: split[5],
								wouldTakeAgain: split[6] == "N/A" ? null : split[6],
							};

							if (split[6] !== "N/A") {
								formattedData = { ...formattedData, wouldTakeAgain: split[6] };
							}

							rmpData.push(formattedData);
							console.log(`Python API request completed (${apiReqIndex}/${total})`);
						} else {
							rmpData.push(null);
							console.log(`Python API request completed (returned null) (${apiReqIndex}/${total})`);
						}
					});

					pythonProcess.stderr.on("data", (data) => {
						console.error(`Python script error: ${data.toString()}`);
						reject(`*****FAIL: Aborted update due to Python script error: ${data.toString()}`);
					});

					pythonProcess.on("close", (code) => {
						if (code === 0) {
							resolve(); // Resolve the promise on successful completion
						} else {
							apiReqErrors += 1;
							reject(`*****FAIL: Python script exited with code ${code}`);
						}
					});
				}, 3500);
			});
		}
		console.log("Python requests complete.");

		if (apiReqErrors > 0) {
			console.log(`***FAIL: ${apiReqErrors} pyhton requests failed. Aborting...`);
			return res.status(400);
		}

		// console.log("Beginning to delete all existing RMP data in MongoDB...");
		// await Instructor.updateMany({}, { $set: { rmpData: null } }); // Delete all existing records
		// console.log("Delete completed.");

		// Once all python script executions are successfully made, update the DB
		const dbPromises = [];
		let dbUpdateIndex = 0;
		let dbUpdateErrors = 0;
		total = rmpData.length;

		console.log("Beginning to update each MongoDB record with new RMP data...");

		for (const rmp of rmpData) {
			await new Promise(async (resolve, reject) => {
				try {
					console.log(`MongoDB create command starting (${++dbUpdateIndex}/${total})`);
					const id = rmp.instructor;
					delete rmp.instructor; // Delete this field, not needed when passed into record as rmpData
					await Instructor.updateOne({ _id: id }, { $set: { rmpData: rmp } });
					console.log(`MongoDB create command completed (${dbUpdateIndex}/${total})`);
					resolve();
				} catch (err) {
					console.log(
						`**** FAIL: Failed to create RMP record for ${rmp.instructor} at index ${dbUpdateIndex - 1}.`
					);
					dbUpdateErrors += 1;
					reject(
						`Could not create RMP object for instructor ${rmp.instructor} at index ${dbUpdateIndex - 1}`
					);
				}
			});
		}
		console.log("MongoDB updates complete.");

		if (dbUpdateErrors > 0) {
			console.log(`***FAIL: ${dbUpdateErrors} attempts to update MongoDB with new RMP data failed.`);
			return res.status(500);
		} else {
			console.log("*****SUCCESS: RMP data update complete.");
			return res.status(200);
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: `Internal server error: ${err}` });
	}
};
