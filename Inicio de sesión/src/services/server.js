import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mainRouter from '../routes/index';
import http from 'http';
import config from './config.js'
import authWebRouter from '../routes/auth'
import homeWebRouter from '../routes/home'
import registerWebRouter from '../routes/register'
import passport from 'passport';

import { loginFunc, signUpFunc } from '../controllers/auth';


const app = express();


app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: 'asd123',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', mainRouter);

app.set('view engine', 'ejs');

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
app.use(authWebRouter)
app.use(homeWebRouter)
app.use(registerWebRouter)


const httpServer = http.Server(app);

export default httpServer;