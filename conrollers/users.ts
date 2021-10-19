import {NextFunction, Request, Response} from "express";
import {User} from '../models/users';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const users_signup = (req: Request, res: Response) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exists'
                })
            }else{
                bcrypt.hash(req.body.password,10, (err, hash) =>{
                    if (err){
                        return res.status(500).json({
                            error: err
                        })
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            userName: req.body.userName,
                            password: hash,
                            userImage: req.file.filename,
                        });
                        user
                            .save()
                            .then(result =>{
                                console.log(result)
                                res.status(201).json({
                                    email: result.email,
                                    id: result._id,
                                    userName: result.userName,
                                    userImage: result.userImage,
                                    message: 'User created'
                                })
                            })
                            .catch(err =>{
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
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if(result){
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h",
                        }
                    );
                    return res.status(200).json({
                        id: user[0]._id,
                        userName: user[0].userName,
                        userImage: user[0].userImage,
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
            res.status(500).json({error:err});
        });
};

const users_delete =(req: Request, res: Response) =>{
    User.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
};

export {users_signup,users_delete,users_login}
