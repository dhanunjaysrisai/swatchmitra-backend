const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  upload,
  handleMulterError,
  createMissionCapture,
} = require('../controllers/missionCaptureController');

/** Smoke test for deploy / routing (no auth). */
router.get('/health', (req, res) => {
  res.json({ ok: true, router: 'mission' });
});

router.post('/captures', auth, upload.single('image'), handleMulterError, createMissionCapture);

module.exports = router;
