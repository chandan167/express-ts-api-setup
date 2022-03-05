import {sign} from 'jsonwebtoken';

export class TokenService{

    static generateToken(id:string){
        return {
            accessToken: this.generateAccessToken(id),
            refreshToken: this.generateRefreshToken(id)
        }
    }

    static generateAccessToken(id:string){
        return sign({
            user_id: id
          }, 'sesdsdsadsadadadcret', { expiresIn: '1h' });
    }

    static generateRefreshToken(id:string){
        return sign({
            user_id: id
          }, 'asdadadsdasdadsda', { expiresIn: '10h' });
    }
}