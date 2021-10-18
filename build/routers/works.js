"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const check_auth_1 = require("../middlewares/check-auth");
const router = express_1.default.Router();
exports.router = router;
const WorksController = require('../controllers/works');
router.get('/', check_auth_1.checkAuth, WorksController.budgets_get_all);
router.post('/', WorksController.budgets_create);
router.get(`/:id`, check_auth_1.checkAuth, WorksController.budgets_get_single);
router.delete(`/:id`, check_auth_1.checkAuth, WorksController.budgets_delete);
router.get(`/:id/budgetCategories`, check_auth_1.checkAuth, WorksController.budgets_get_single_with_budgetCategories);
router.get(`/:id/transactions`, check_auth_1.checkAuth, WorksController.budgets_get_single_with_transactions);
