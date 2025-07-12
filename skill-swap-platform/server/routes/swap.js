const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendSwap, updateSwap, leaveFeedback } = require('../controllers/swapController');

router.post('/', auth, sendSwap);
router.put('/:id', auth, updateSwap);
router.post('/feedback', auth, leaveFeedback);

module.exports = router;
