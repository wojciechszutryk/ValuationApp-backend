import {Works} from "../models/works";
import { NextFunction,Request, Response } from 'express';

const works_get_all = (req: Request, res: Response, next: NextFunction) => {
    Works.find()
        .select('valuationObjectsId valuationObjectId _id')
        .exec()
        .then(docs => {
            const works = docs.map(doc => {
                return{
                    id: doc._id,
                    valuationObjectId: doc.valuationObjectId,
                    valuationObjectsId: doc.valuationObjectsId,
                    request:{
                        type: 'GET',
                        url: process.env.SERVER_URL+'works/'+doc._id
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

export {works_get_all}