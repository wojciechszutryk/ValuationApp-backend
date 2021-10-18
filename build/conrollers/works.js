"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.works_get_all = void 0;
const works_1 = require("../models/works");
const works_get_all = (req, res, next) => {
    works_1.Works.find()
        .select('name totalAmount _id userId')
        .exec()
        .then(docs => {
        const budgets = docs.map(doc => {
            return {
                id: doc._id,
                name: doc.name,
                totalAmount: doc.totalAmount,
                userId: doc.userId,
                request: {
                    type: 'GET',
                    url: process.env.SERVER_URL + 'budgets/' + doc._id
                }
            };
        });
        res.status(200).json(budgets);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};
exports.works_get_all = works_get_all;
