import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import 'dotenv/config'

const port = process.env.PORT || 5000;
const server = express();

import {router as worksRouter} from "./routers/works";
import {router as valuationObjectsRouter} from "./routers/valuationObjects";
import {router as usersRouter} from "./routers/users";

mongoose.connect('mongodb+srv://admin:'+process.env.MONGODB_PW+'@cluster0.ooyuy.mongodb.net/valuationApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions);
mongoose.Promise = global.Promise;

server.use(cors({
    origin: "*"
}))
server.use(morgan('dev'));
server.use('/uploads', express.static('uploads'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-methods', 'GET,PUT,POST,PATCH,DELETE');
        return  res.status(200).json({});
    }
    next();
})

server.use('/works', worksRouter);
server.use('/valuationObjects', valuationObjectsRouter);
server.use('/users', usersRouter);

server.use((req, res, next) => {
    const error =new Error('not found');
    res.status(404);
    next(error);
});

server.use((error:any, req:express.Request, res: express.Response, next:express.NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const serv = http.createServer(server);

serv.listen(port);