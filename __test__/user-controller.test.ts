import { StatusCodes } from 'http-status-codes';
import request from './request';
import { UserModel } from '../src/models';
import { UserService } from '../src/services/user.service';

beforeEach(async () =>{
    await UserModel.deleteMany();
})


describe('UserController test', () => {

    async function signup(){
        const user ={
            name: "Chandan Singh",
            email: "chandansingh16794@gmail.com",
            password: "password"
        }
        return await request().post('/api/user/signup').send(user);
    }
 
    describe.each([
        { name: null,       email: 'chandan@gmail.com', password: 'password',   expected: 'name is required' },
        { name: 'chandan',  email: null,                password: 'password',   expected: 'email is required' },
        { name: 'chandan',  email: 'chandan@gmail.com', password: null,         expected: 'password is required' },
        { name: 'chandan',  email: 'chandan',           password: 'password',   expected: 'invalid email' },
    ])('user signup ($name, $email, $password)', ({ name, email, password, expected }) => {
    
        test(`returns ${expected}`, async () => {
            const response = await request().post('/api/user/signup').send({ name, email, password })
            expect(response.body.message).toBe(expected);
            expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        });
    })

    test('user signup expect response status code 201', async () => {
        const response = await signup();
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });

    test('user signup expect user._id exist in response body', async () => {
        const response = await signup();
        expect(response.body.user._id).toBeTruthy();
        expect(response.body.user.password).toBeFalsy();
    });

    test('user signup expect password not exist in response body', async () => {
        const response = await signup();
        expect(response.body.user.password).toBeFalsy();
    });


})


describe("UserController login", () => {

    async function loginTeat(){
        const user:any ={
            email: "chandansingh16794@gmail.com",
            password: "password"
        }
        await UserService.signUp({...user, name: "Chandan Singh",});
        return  await request().post('/api/user/login').send({...user});
    }
    test('user login expect status 200', async () =>{
       const response = await loginTeat()
        expect(response.status).toEqual(StatusCodes.OK);
    });

    test('user login expect success message ', async () =>{
        const response = await loginTeat()
         expect(response.body.message).toEqual('login successful'),
         expect(response.body.token.accessToken).toBeTruthy();
         expect(response.body.token.refreshToken).toBeTruthy();
     });

     test('user login expect token exist ', async () =>{
        const response = await loginTeat()
         expect(response.body.token).toBeTruthy();
     });

     test('user login expect token.refreshToken exist ', async () =>{
        const response = await loginTeat()
         expect(response.body.token.refreshToken).toBeTruthy();
     });

     test('user login expect token.accessToken exist ', async () =>{
        const response = await loginTeat()
         expect(response.body.token.accessToken).toBeTruthy();
     });


})

