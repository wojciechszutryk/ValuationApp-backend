"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Works = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const worksSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    valuationObjectId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ValuationObject', required: true },
    valuationObjectsId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ValuationObjects', required: true },
});
let Works;
exports.Works = Works;
if (mongoose_1.default.models.works) {
    exports.Works = Works = mongoose_1.default.model('works');
}
else {
    exports.Works = Works = mongoose_1.default.model('works', worksSchema);
}
