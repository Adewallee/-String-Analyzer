const express = require('express');
const router = express.Router();
const stringController = require('../controllers/stringController');

router.post('/', stringController.analyzeString);
router.get('/:string_value', stringController.getString);
router.delete('/:string_value', stringController.deleteString);
router.get('/', stringController.getAllStrings);
router.get('/filter-by-natural-language', stringController.filterByNaturalLanguage);

module.exports = router;