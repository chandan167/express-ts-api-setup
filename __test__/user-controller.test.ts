import { StatusCodes } from 'http-status-codes';
import request from './request';
import { UserModel } from '../src/models';
import { UserService } from '../src/services/user.service';

beforeEach(async () =>{
    await UserModel.deleteMany();
})


describe('UserController test', () => {

 
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

    test('user signup expect response status code 200', async () => {
        const user ={
            name: "Chandan Singh",
            email: "chandansingh16794@gmail.com",
            password: "password"
        }
        const response = await request().post('/api/user/signup').send(user);
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(response.body.user._id).toBeTruthy();
        expect(response.body.user.name).toEqual(user.name);
        expect(response.body.user.email).toEqual(user.email);
        expect(response.body.user.password).toBeFalsy();
    });


   

})


describe("UserController login", () => {

    test('user login expect status 200 and token date in response', async () =>{
        const user:any ={
            email: "chandansingh16794@gmail.com",
            password: "password"
        }
        await UserService.signUp({...user, name: "Chandan Singh",});
        const response = await request().post('/api/user/login').send({...user});
        expect(response.status).toEqual(StatusCodes.OK);
        expect(response.body.message).toEqual('login successful'),
        expect(response.body.token.accessToken).toBeTruthy();
        expect(response.body.token.refreshToken).toBeTruthy();
    });

})

