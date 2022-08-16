import Router from 'koa-router';
import {Context, Next } from 'koa'
import authController from '../controllers/authController'
import passportLocal from '../middlewares/authMiddleware'

const router = new Router({
    prefix: '/auth'
})

router.get('/login', passportLocal.authenticate('login'), (ctx: Context, next: Next) => {
    return ctx.body = {
        status: 'success',
        message: 'logueado',
      };
})



router.post('/login', passportLocal.authenticate('login'), (ctx: Context, next: Next) => {
    ctx.body = {
        status: 'success',
        message: `Logueado`,
      };
})

router.post('/signup', authController.userExists, passportLocal.authenticate('signup'), (ctx: Context, next: Next)=> {
    ctx.body = {
        status: 'success',
        message: `Te has registrado!!`,
      };
})

router.post('/logout', authController.logout, (ctx: Context, next: Next) => {
    ctx.body = {
        status: 'success',
        message: `logout successful`,
      };
})

export default router.routes()
