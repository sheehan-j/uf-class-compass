const express = require('express');
const router = express.Router();
const RMPController = require('../controllers/RMPController');
const Instructor = require('../model/Instructor');

router.route('/update').post(RMPController.updateRMPData);

router.get('/url/:instructorId', async (req, res) => {
  try {
    const instructor = await Instructor.findOne({
      'rmpData.rmpId': req.params.instructorId,
    });
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found.' });
    }

    if (instructor.rmpData && instructor.rmpData.rmpId) {
      const rmpUrl = `https://www.ratemyprofessors.com/professor/${instructor.rmpData.rmpId}`;

      return res.json({ rmpUrl });
    } else {
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
