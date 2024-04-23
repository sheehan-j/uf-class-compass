const express = require('express');
const router = express.Router();
const RMPController = require('../controllers/RMPController');
const Instructor = require('../model/Instructor');

router.route('/update').post(RMPController.updateRMPData);

router.get('/url/:instructorId', async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    console.log('Instructor ID:', instructorId);

    const instructor = await Instructor.findOne({
      'rmpData.rmpId': instructorId,
    });
    console.log('Instructor:', instructor);

    if (!instructor) {
      console.log('Instructor not found.');
      return res.status(404).json({ error: 'Instructor not found.' });
    }

    if (instructor.rmpData && instructor.rmpData.rmpId) {
      const rmpUrl = `https://www.ratemyprofessors.com/professor/${instructor.rmpData.rmpId}`;
      console.log('RMP URL:', rmpUrl);

      return res.json({ rmpUrl });
    } else {
      console.log('Rate My Professor data not found for this instructor.');
      return res.status(404).json({
        error: 'Rate My Professor data not found for this instructor.',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
