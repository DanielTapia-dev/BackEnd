const { Router } = require('express');
const users = require('../controllers/users');

const router = Router();

router.post('/login', users.usersGet);
router.post('/register', users.usersPost);

module.exports = router;