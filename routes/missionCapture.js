const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  upload,
  handleMulterError,
  createMissionCapture,
} = require('../controllers/missionCaptureController');

const captureHandlers = [auth, upload.single('image'), handleMulterError, createMissionCapture];

/** Smoke test (no auth). Same router is mounted at /api/mission and /api/mission-captures in server.js */
router.get('/health', (req, res) => {
  res.json({ ok: true, router: 'missionCapture' });
});

/** Frontend uses POST /api/mission/captures */
router.post('/captures', ...captureHandlers);

/** Legacy: POST /api/mission-captures */
router.post('/', ...captureHandlers);

module.exports = router;
