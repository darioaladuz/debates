const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

/* GET users listing. */
router.get('/', usersController.getAll);

router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.get('/test', usersController.test);

// router.get('/update_schema', usersController.updateSchema);

module.exports = router;
