import mongoose from "mongoose";
import MongoDB from '../utils/mongoConnection';
import bcrypt from 'bcrypt';
import { errorLogger, infoLogger, warnLogger, debugLogger } from '../utils/loggers'

export interface UserObject {

    _id?: string
    firstName: string
    lastName: string
    email: string
    age: number
    isAdmin: boolean
    password: string
    phoneNum: string
}

export const dbCollection = 'users'

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    isAdmin: { type: Boolean, required: false},
    password: { type: String, required: true},
    phoneNum: { type: String, required: true},
})

userSchema.pre('save', async function (next) {

    const user = this
    const hash = await bcrypt.hash(user.password, 15)
    this.password = hash
    next()
})

userSchema.methods.isValidPassword = async function (password: string) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

class Users {
    private users

    
    constructor() {
        MongoDB.getConnection()
        this.users = mongoose.model(dbCollection, userSchema)
    }

    async getUser() {
        try {
            const response = await this.users.find()
            return response
        } catch (error:any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting users: ${error.message}`)
        }
    }

    async getUserById(id: string) {
        try{
            const response = await this.users.findById(id)
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error gettin user: ${error.message}`)
        }
    }

    async getUserByEmail(email: string) {
        try{
            const response = await this.users.findOne({ email: email })
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting user: ${error.message}`)
        }
    }

    async postUser(user: UserObject) {
        try{
            const newUser = new this.users(user)
            await newUser.save()
            return newUser
        } catch (error:any) {
            errorLogger.error(error.message)
            throw new Error(`Error creating user: ${error.message}`)
        }
    }

    async updateUser(user: UserObject) {
        try{
            const response = await this.users.findByIdAndUpdate(user._id, user)
            return response
        } catch (error:any) {
            errorLogger.error(error.message)
            throw new Error(`Error updating user: ${error.message}`)
        }
    }

    async validateUserPassword(user: UserObject, password: string): Promise<boolean> {
        const response = await this.users.findOne({ email: user.email })
        if (!response) return false
        const compare = await bcrypt.compare(password, response.password)
        if (!compare) return false
        return true
      }
}

const users = new Users()
export default users
