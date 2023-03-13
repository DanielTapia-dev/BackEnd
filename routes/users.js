const { Router } = require('express');
const users = require('../controllers/users');

const router = Router();

router.get('/', users.usersGet);
router.post('/', users.usersPost);
router.put('/:id', users.usersPut);
router.patch('/:id', users.usersPatch);
router.delete('/:id', users.usersDelete);

module.exports = router;