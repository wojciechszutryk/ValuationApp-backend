import express from 'express'
import {users_signup,users_delete,users_login} from "../conrollers/users";
const router = express.Router();

router.post('/signup', users_signup);

router.post('/login', users_login);

router.delete('/:id', users_delete);

export {router};