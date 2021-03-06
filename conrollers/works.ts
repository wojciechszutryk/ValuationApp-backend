import mongoose from "mongoose";
import { Works } from "../models/works";
import { ValuationObjects } from "../models/valuationObjects";
import { NextFunction, Request, Response } from 'express';

const works_get_all = (req: Request, res: Response, next: NextFunction) => {
    Works.find()
        .select('_id userId date parameters')
        .exec()
        .then(docs => {
            const works = docs.map(doc => {
                return {
                    id: doc._id,
                    date: doc.date,
                    parameters: doc.parameters,
                    userId: doc.userId,
                    request: {
                        type: 'GET',
                        url: process.env.SERVER_URL + 'works/' + doc._id
                    }
                }
            });
            res.status(200).json(works);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}


const works_create = (req: Request, res: Response, next: NextFunction) => {
    const budget = new Works({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        date: req.body.date,
        parameters: req.body.parameters,
    });
    budget.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Created Work successfully',
            createdWork: {
                id: result._id,
                userId: result.userId,
                parameters: result.parameters,
                date: result.date,
                request: {
                    type: 'GET',
                    url: process.env.SERVER_URL + 'works/' + result._id,
                }
            },
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

const works_get_valuationObjects = (req: Request, res: Response, next: NextFunction) => {
    ValuationObjects.find({ workId: req.params.id })
        .select('_id workId name parametersValues area price isForValuation')
        .exec()
        .then(docs => {
            console.log(docs)
            if (docs.length === 0) {
                return res.status(404).json({
                    message: 'valuationObjects not found'
                })
            }
            const works = docs.map(doc => {
                return {
                    id: doc._id,
                    workId: doc.workId,
                    name: doc.name,
                    parametersValues: doc.parametersValues,
                    price: doc.price,
                    area: doc.area,
                    isForValuation: doc.isForValuation,
                    request: {
                        type: 'GET',
                        url: process.env.SERVER_URL + 'valuationObjects/' + doc._id
                    }
                }
            });
            res.status(200).json(works);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

const works_get_single = (req: Request, res: Response, next: NextFunction) => {
    Works.findById(req.params.id)
        .select('parameters _id date userId')
        .exec()
        .then(work => {
            if (!work) {
                return res.status(404).json({
                    message: 'work not found'
                })
            }
            res.status(200).json({
                id: work._id,
                date: work.date,
                parameters: work.parameters,
                userId: work.userId,
                request: {
                    type: 'GET',
                    url: process.env.SERVER_URL + 'works/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

const works_delete = (req: Request, res: Response, next: NextFunction) => {
    Works.remove({ _id: req.params.id })
        .exec()
        .then(() => {
            ValuationObjects.remove({ workId: req.params.id })
                .exec()
                .then(() => {
                    res.status(200).json({
                        message: 'work deleted',
                        request: {
                            type: 'POST',
                            url: process.env.SERVER_URL + 'works',
                            body: {
                                parameters: 'Array',
                                date: 'String'
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

export { works_get_all, works_create, works_get_single, works_delete, works_get_valuationObjects }