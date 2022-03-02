import { StatusCodes } from 'http-status-codes';
import request from './request';


describe('UserController test', () => {

    test('user signup expect response ststus code 200', async () => {
        const response = await request().post('/api/user/signup').send({
            name: "Chandan Singh",
            email: "chandansingh16794@gmail.com",
            password: "password"
        });
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });


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

})

