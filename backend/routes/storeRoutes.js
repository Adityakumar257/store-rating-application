const express = require('express');
const { addStore, getAllStores, searchStores } = require('../controllers/storeController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', auth, role('admin'), addStore);
router.get('/', auth, getAllStores);
router.get('/search', auth, searchStores);

module.exports = router;
