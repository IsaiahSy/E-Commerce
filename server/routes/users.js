import express from 'express';
import * as usersControllers from '../controllers/users.js';

const router = express.Router();

router.get('/:id', usersControllers.verifyUserAccount);
router.post('/signin', usersControllers.signin);
router.post('/signup', usersControllers.signup);

export default router;