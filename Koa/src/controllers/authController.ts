import {Context, Next } from 'koa'
import usersAPI from '../apis/usersAPI'

class AuthController {

    async userExists (ctx: Context, next: Next) {
        const user = await usersAPI.getUserByEmail(ctx.params.email)
        if (user) return ctx.body = {message:'User already registered'}
        next()
    }

    async logout (ctx: Context, next: Next) {
        ctx.session?.destroy
        return ctx.body = {message: 'User logget out'}
    }
}

const authController = new AuthController()
export default authController 