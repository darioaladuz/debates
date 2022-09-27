const express = require('express');
const router = express.Router();
const debatesController = require('../controllers/debates');

/* GET debates listing. */
router.get('/', debatesController.getAll);

router.post('/', debatesController.add);

router.get('/:id', debatesController.getOne);


module.exports = router;
