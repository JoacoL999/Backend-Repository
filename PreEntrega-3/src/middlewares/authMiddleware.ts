import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local'
import { Request, Response, NextFunction } from 'express'
import usersAPI from '../apis/usersAPI'
import { errorLogger, infoLogger, warnLogger, debugLogger } from '../utils/loggers'
import CartsController from "../controllers/cartsController";

const strategyOptions: IStrategyOptionsWithRequest = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const login: VerifyFunctionWithRequest = async (req: Request, email: string, password: string, done: any) => {
    const user = await usersAPI.getUserByEmail(email)
    const validPassword = await usersAPI.validateUserPassword(user, password)
    if (!user || !validPassword) {
        errorLogger.error('User not found' + email)
        return done(null, false, { message: 'Invalid Email/Password' })
    }
    infoLogger.info('User logger' + email)
    return done(null, user)
}

const signup: VerifyFunctionWithRequest = async (req: Request, email: string, password: string, done: any) => {
    try {
        const { firstName, lastName, email, age, isAdmin, password, phoneNum } = req.body
        const user = { firstName, lastName, email, age, isAdmin, password, phoneNum}
        const newUser = await usersAPI.postUser(user)
        infoLogger.info('User created!', newUser)
        CartsController.createCart(user.email)
        return done(null, newUser)
    } catch (error: any) {
        errorLogger.error('Error creating new USER:', error)
        return done(null, false, { message: error.message })
    }
}

export const loginFunc = new LocalStrategy(strategyOptions, login)
export const signupFunc = new LocalStrategy(strategyOptions, signup)

passport.serializeUser((user: any, done) => {
    done(null, user.email)
})

passport.deserializeUser((email, done) => {
    usersAPI.getUserByEmail(email).then((user) => {
        return done(null, user)
    })
})


export default passport