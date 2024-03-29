import Users from '../models/users'

class UsersAPI {

    async getUserById (user: any) {
        return await Users.getUserById(user)
    } 

    async getUserByEmail (user: any) {
        return await Users.getUserByEmail(user)
    }

    async postUser (user: any) {
        return await Users.postUser(user)
    }
    
    async updateUser (id: string,user: any) {
        return await Users.updateUser(id, user)
    }

    async validateUserPassword (user: any, password: string) {
        return await Users.validateUserPassword(user, password)
    }
}

const usersAPI = new UsersAPI()
export default usersAPI