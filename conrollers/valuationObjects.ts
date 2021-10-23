import mongoose from "mongoose";
import {ValuationObjects} from "../models/valuationObjects";
import { NextFunction,Request, Response } from 'express';

const valuationObjects_get_all = (req: Request, res: Response, next: NextFunction) => {
    ValuationObjects.find()
        .select('_id workId name parametersValues area price isForValuation')
        .exec()
        .then(docs => {
            const works = docs.map(doc => {
                return{
                    id: doc._id,
                    workId: doc.workId,
                    name: doc.name,
                    parametersValues: doc.parametersValues,
                    price: doc.price,
                    area: doc.area,
                    isForValuation: doc.isForValuation,
                    request:{
                        type: 'GET',
                        url: process.env.SERVER_URL+'valuationObjects/'+doc._id
                    }
                }
            });
            res.status(200).json(works);
        })
        .catch((err:any) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}


const valuationObjects_create = (req: Request, res: Response, next: NextFunction) => {
    console.log(new mongoose.Types.ObjectId())
    const valuationObject = new ValuationObjects({
        _id: new mongoose.Types.ObjectId(),
        workId: req.body.workId,
        name: req.body.name,
        parametersValues: req.body.parametersValues,
        area: req.body.area,
        price: req.body.price,
        isForValuation: req.body.isForValuation,
    });
    valuationObject.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Created valuationObject successfully',
            createdValuationObject: {
                id: result._id,
                workId: result.workId,
                name: result.name,
                parametersValues: result.parametersValues,
                area: result.area,
                price: result.price,
                isForValuation: result.isForValuation,
                request: {
                    type: 'GET',
                    url: process.env.SERVER_URL+'valuationObjects/'+ result._id,
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

const valuationObjects_get_single = (req: Request, res: Response, next: NextFunction) => {
    ValuationObjects.findById(req.params.id)
        .select('_id workId name parametersValues area price isForValuation')
        .exec()
        .then(valuationObject => {
            if (!valuationObject){
                return res.status(404).json({
                    message: 'ValuationObject not found'
                })
            }
            res.status(200).json({
                id: valuationObject._id,
                workId: valuationObject.workId,
                name: valuationObject.name,
                parametersValues: valuationObject.parametersValues,
                area: valuationObject.area,
                price: valuationObject.price,
                isForValuation: valuationObject.isForValuation,
                request:{
                    type: 'GET',
                    url: process.env.SERVER_URL+'valuationObjects/'
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

const valuationObjects_delete = (req: Request, res: Response, next: NextFunction) => {
    ValuationObjects.remove({_id: req.params.id})
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'valuationObject deleted',
                request:{
                    type: 'POST',
                    url: process.env.SERVER_URL+'valuationObjects',
                    body: {
                        workId: 'String',
                        name: 'String',
                        parametersValues: 'Array',
                        area: 'Number',
                        price: 'Number',
                        isForValuation: 'Boolean',
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
}

export {valuationObjects_delete, valuationObjects_get_single, valuationObjects_create, valuationObjects_get_all}