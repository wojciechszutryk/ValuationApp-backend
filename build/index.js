"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const port = process.env.PORT || 5000;
const server = (0, express_1.default)();
const works_1 = require("./routers/works");
mongoose_1.default.connect('mongodb+srv://admin:' + process.env.MONGODB_PW + '@cluster0.ooyuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose_1.default.Promise = global.Promise;
server.use((0, cors_1.default)({
    origin: "*"
}));
server.use((0, morgan_1.default)('dev'));
server.use('/uploads', express_1.default.static('uploads'));
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-methods', 'GET,PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});
server.use('/works', works_1.router);
server.use((req, res, next) => {
    const error = new Error('not found');
    res.status(404);
    next(error);
});
server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
const serv = http_1.default.createServer(server);
serv.listen(port);
