import supertest from 'supertest';
import app from '../src/app';

export default function request(){
    return supertest(app);
}