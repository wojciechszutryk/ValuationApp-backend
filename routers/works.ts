import express from 'express'
import {works_create, works_delete, works_get_all, works_get_single, works_get_valuationObjects} from "../conrollers/works";
import {checkAuth} from "../middlewares/check-auth";
const router = express.Router();

router.get('/', works_get_all);
// router.get('/', checkAuth, works_get_all);
router.post('/', works_create);
router.get(`/:id`, works_get_single);
router.get(`/:id/valuationObjects`, works_get_valuationObjects);
router.delete(`/:id`, works_delete);

export {router};