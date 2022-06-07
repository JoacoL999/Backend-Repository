import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mainRouter from '../routes/index';
import http from 'http';
import config from './config.js'
import authWebRouter from '../routes/auth'
import homeWebRouter from '../routes/home'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', mainRouter);

app.set('view engine', 'ejs');

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


app.use(authWebRouter)
app.use(homeWebRouter)



// app.use(function (err, req, res, next) {
//   return res.status('500').json({
//     msg: 'There was an unexpected error',
//     error: err.message,
//   });
// });

const httpServer = http.Server(app);

export default httpServer;