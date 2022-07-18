import express, { Request, Response, ErrorRequestHandler } from 'express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import * as http from 'http'
import { connectionURL } from '../utils/mongoConnection';
import routes from '../routes'
import cors from 'cors'
import { loginFunc, signupFunc } from '../middlewares/authMiddleware';

const app = express()

app.use(cors())

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`HUBO UN ERROR ${err}`)
    res.status(500).json({
      err: err.message
    })
  }
  app.use(errorHandler)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const time = 1000*60*60

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionURL,
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
}

app.use(cookieParser())
app.use(session(StoreOptions))
app.use(passport.initialize())
app.use(passport.session())
passport.use('login', loginFunc)
passport.use('signup', signupFunc)

app.use('/api', routes)

app.use((req, res) => {
    res.status(404).json({
      message: 'invalid address'
    })
})

const myServer = new http.Server(app)
export default myServer