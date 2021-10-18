import express from 'express'
import {works_get_all} from "../conrollers/works";
import {checkAuth} from "../middlewares/check-auth";
const router = express.Router();

router.get('/', works_get_all);

export {router};