import { UserObject } from "../models/users"
import { UsersModel } from "../models/users"
import { debugLogger } from '../utils/loggers'
import userDAO from '../controllers/userDAO'
import usersAPI from '../apis/usersAPI'
import bcrypt from 'bcrypt'


describe('User TEST', () => {
    let userTest: userDAO

    beforeAll(async () => {
        debugLogger.debug('beforeAll running')
        userTest = await userDAO.getInstance();
        await UsersModel.deleteMany()
    })

    afterEach(async () => {
        debugLogger.debug('afterEach running')
        await UsersModel.deleteMany()
    })

    afterAll(async () => {
        console.log('afterAll running')
        await userTest.disconnect()
    })

    describe('userDao Get', () => {
        it('waiting an empty array without req an id and you have an empty DB', async () => {
            const expectedRes: UserObject[] = []

            const data = await userTest.get()

            expect(data).toEqual(expectedRes)
        })

        it('waiting an object as i want to request if the id is valid', async () => {
            const objectData = {
                firstName: "Jeremias",
                lastName: "Lucchetti",
                email: "anakin_lla@hotmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",
            }

            const product = await UsersModel.create(objectData)

            const data = await userTest.get(product._id)

            

            expect(data[0]._id).toEqual(product._id);
			expect(data[0].firstName).toEqual(objectData.firstName);
            expect(data[0].lastName).toEqual(objectData.lastName);
            expect(data[0].email).toEqual(objectData.email);
            expect(data[0].age).toEqual(objectData.age);
            expect(data[0].isAdmin).toEqual(objectData.isAdmin);
            expect(bcrypt.compare(data[0].password, objectData.password)).toEqual(bcrypt.compare(data[0].password, objectData.password));
            expect(data[0].phoneNum).toEqual(objectData.phoneNum);
        })
    })

    describe('UserDao Add', () => {
        it('should save successfully a new user', async () => {
            const newUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",

            }


            const result = await userTest.add(newUser)

            expect(result.firstName).toEqual(newUser.firstName)
            expect(result.lastName).toEqual(newUser.lastName)
            expect(result.email).toEqual(newUser.email)
            expect(result.age).toEqual(newUser.age)
            expect(result.isAdmin).toEqual(newUser.isAdmin)
            expect(bcrypt.compare(result.password, newUser.password)).toEqual(bcrypt.compare(result.password, newUser.password))
            expect(result.phoneNum).toEqual(newUser.phoneNum)
            expect(result._id).toBeDefined()
        })
    })

    describe('UserDao Update', () => {
        it('should update succesfully a user', async () => {
            const testUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",

            }

            const product = await UsersModel.create(testUser)

            const newData = {
                firstName: "Darth",
                lastName: "Vader",
                email: "anakin@gmail.com",
                age: 47,
                isAdmin: true, 
                password: "eee3", 
                phoneNum: "+5492216255554",

            }

            const result = await userTest.update(product._id, newData)

                expect(result.lastName).toEqual(newData.lastName);
                expect(result.firstName).toEqual(newData.firstName);

            
           
        })
    })

    describe('UserDao Delete', () => {
        it('should delete succesfully an user', async () => {
            const testUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",

            }

            const product = await UsersModel.create(testUser)
            
            await userTest.delete(product._id)
            
            const result = await userTest.get(product._id)

            expect(result).toEqual([])

        })
    })
})