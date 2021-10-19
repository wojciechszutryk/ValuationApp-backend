import express from 'express'
import { users_signup, users_delete, users_login, users_get_works} from "../conrollers/users";
const router = express.Router();

router.post('/signup', users_signup);

router.post('/login', users_login);

router.delete('/:id', users_delete);

router.get('/:id/works', users_get_works);

export { router };