import { NextFunction, Request, Response } from "express";
import { Users } from '../models/users';
import {ValuationObjects} from "../models/valuationObjects";
import { Works } from '../models/works';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const users_signup = (req: Request, res: Response) => {
    Users.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new Users({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            userName: req.body.userName,
                            password: hash,
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    email: result.email,
                                    id: result._id,
                                    userName: result.userName,
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                })
                            });
                    }
                })
            }
        })
};

const users_login = (req: Request, res: Response) => {
    Users.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                        process.env.JWT_KEY as jwt.Secret,
                        {
                            expiresIn: "1h",
                        }
                    );
                    return res.status(200).json({
                        id: user[0]._id,
                        userName: user[0].userName,
                        message: 'Auth successful',
                        token: token,
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

const users_delete = (req: Request, res: Response) => {
    console.log(req.params)
    Users.remove({ _id: req.params.id })
        .exec()
        .then(() => {
            Works.find({ userId: req.params.id })
                .select('workId')
                .exec()
                .then((result) => {
                    result.forEach((r) => {
                        Works.remove({ _id: r._id })
                            .exec()
                            .then(() => {
                                ValuationObjects.remove({ workId: r._id })
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
                    })
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
            res.status(500).json({ error: err });
        });
};

const users_get_works = (req: Request, res: Response, next: NextFunction) => {
    Works.find({ userId: req.params.id })
        .select('_id userId date parameters')
        .exec()
        .then(docs => {
            if (docs.length === 0) {
                return res.status(404).json({
                    message: 'works not found'
                })
            }
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

export { users_signup, users_delete, users_login, users_get_works }