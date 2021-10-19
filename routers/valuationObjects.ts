import express from "express";
import {
    valuationObjects_create, valuationObjects_delete,
    valuationObjects_get_all,
    valuationObjects_get_single
} from "../conrollers/valuationObjects";
import {checkAuth} from "../middlewares/check-auth";
const router = express.Router();

router.get('/', valuationObjects_get_all);
router.post('/', valuationObjects_create);
router.get(`/:id`, valuationObjects_get_single);
router.delete(`/:id`, valuationObjects_delete);

export {router};