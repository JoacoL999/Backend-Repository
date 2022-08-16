import Koa from 'koa'
import koaBody from 'koa-body';
import Router from 'koa-router'
import MongoStore from 'connect-mongo';
import cookieParser from 'koa-cookie-parser';
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport';
import session from 'koa-generic-session'
import { connectionURL } from '../utils/mongoConnection';
import mainRouter from '../routes'
import cors from '@koa/cors'
import { loginFunc, signupFunc } from '../middlewares/authMiddleware';


const app = new Koa()
const router = new Router({
  prefix: '/'
})


app.use(cors())

app.use(koaBody());
app.use(bodyParser())

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err) {
    const miError: any = err;
    console.log(`HUBO UN ERROR ${miError.message}`);
    ctx.status = 500;
    ctx.body = { error: miError.message };
    ctx.app.emit('error', err, ctx);
  }
});

const time = 1000*60*60

const StoreOptions = {
    store: new MongoStore({
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

app.use(session(StoreOptions))
app.use(cookieParser({cookieNameList:['userId','uuId'],
cipherKey:"hello world",
maxAge:60*60*24}))
app.use(passport.initialize())
app.use(passport.session())
passport.use('login', loginFunc)
passport.use('signup', signupFunc)
app.use(router.routes()).use(router.allowedMethods())
app.use(mainRouter)

export default app