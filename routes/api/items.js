const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const searchController = require('../../controllers/api/search');

// GET /api/items
router.get('/', itemsCtrl.index);
// GET /api/items/:id
router.get('/:id', itemsCtrl.show);

// GET /items/search
router.get('/search', searchController.index);


module.exports = router;
