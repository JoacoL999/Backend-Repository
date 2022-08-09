"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const http = __importStar(require("http"));
const mongoConnection_1 = require("../utils/mongoConnection");
const routes_1 = __importDefault(require("../routes"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("./graphql");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const errorHandler = (err, req, res, next) => {
    console.log(`HUBO UN ERROR ${err}`);
    res.status(500).json({
        err: err.message
    });
};
app.use(errorHandler);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: graphql_1.graphQLMainSchema,
    graphiql: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const time = 1000 * 60 * 60;
const StoreOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: mongoConnection_1.connectionURL,
        dbName: 'coderBackend',
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1
    }),
    secret: "Secret999",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: time }
};
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(StoreOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use('login', authMiddleware_1.loginFunc);
passport_1.default.use('signup', authMiddleware_1.signupFunc);
app.use('/api', routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: 'invalid address'
    });
});
const myServer = new http.Server(app);
exports.default = myServer;
