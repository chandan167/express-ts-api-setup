import { StatusCodes } from 'http-status-codes';
import request from './request';


describe('Application health check test', () =>{
    test('health check return 200 status', async () =>{
        const response = await request().get('/health-check')
        expect(response.statusCode).toBe(StatusCodes.OK)
    })

    test('health check expect to send message (good health) and status 200 in body', async () =>{
        const response:any = await request().get('/health-check')
        expect(response.body).toEqual({status: StatusCodes.OK, message: "good health"});
    })

    test('hit invalid url except to return 404 status', async () =>{
        const response = await request().get('/health-check-')
        expect(response.status).toBe(StatusCodes.NOT_FOUND)
    })
    
})