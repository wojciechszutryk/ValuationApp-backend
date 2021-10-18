import jwt from 'jsonwebtoken'
import { NextFunction, Response } from 'express';
import { Request } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization!.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY!);
        // @ts-ignore
        req.userData = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Auth failed',
        });
    }
};

export {checkAuth};