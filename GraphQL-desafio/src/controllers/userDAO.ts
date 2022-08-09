import { UsersModel } from '../models/users';
import MongoDB from '../utils/mongoConnection';
import { UserObject } from "../models/users"
import mongoose from 'mongoose';
import users from '../models/users';

export default class UserDao {
  private static instance: UserDao;

  UserDao = UsersModel
  users = users;

  private constructor() {}

  static async getInstance () {
    if(!UserDao.instance) {
      console.log('Inicializamos DAO Products');
      await MongoDB.getConnection();
      UserDao.instance = new UserDao();
      
    }
    return UserDao.instance;
  }

   async disconnect() {
    await mongoose.disconnect()
  }

  async get(id?: any): Promise<UserObject[]> {
    let output: UserObject[] = [];

    if (id) {
      if (mongoose.isValidObjectId(id)) {
        const document = await this.users.getUserById(id);
        if (document) output.push(document);
      }
    } else {
      output = await this.UserDao.find();
    }

    return output;
  }

  async add(data: UserObject): Promise<UserObject> {
    const newUser = await this.users.postUser(data);
    console.log('\n\n\n new product');
    console.log(newUser)
    return newUser;
  }

  async update(id: any, newUser: UserObject): Promise<UserObject> {
    return this.users.updateUser(id, newUser);
  }

  async delete(id: any) {
    await this.users.deleteUser(id);
  }
}