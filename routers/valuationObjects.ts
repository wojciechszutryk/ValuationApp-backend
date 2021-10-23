import express from "express";
import {
    valuationObjects_create, valuationObjects_delete,
    valuationObjects_get_all,
    valuationObjects_get_single
} from "../conrollers/valuationObjects";
import {checkAuth} from "../middlewares/check-auth";
const router = express.Router();

router.get('/', checkAuth, valuationObjects_get_all);
router.post('/', checkAuth, valuationObjects_create);
router.get(`/:id`, checkAuth, valuationObjects_get_single);
router.delete(`/:id`, checkAuth, valuationObjects_delete);

export {router};