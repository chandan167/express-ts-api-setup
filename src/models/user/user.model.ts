import { Schema, model, Document, Model } from 'mongoose';
import {genSalt, hash, compare} from 'bcryptjs';
import config from 'config';


export interface User extends Document {
    _id?: string;
    name: string;
    avatar?: string;
    email: string;
    emailVerifiedAt?: Date;
    phone?: string;
    phoneVerifiedAt?: Date;
    password: string;
    lastLogin?: Date;
    isOnline?:boolean;
    blockedAt?: Date;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserModelI extends Model<User>{
    findByEmail(email:string):Promise<this|null>;
    login(email:string, password:string):Promise<null|this>;
    createToken():AuthToken
}

export interface AuthToken{
    authToken:string;
    refreshToken:string;
}

const userSchema = new Schema<User, UserModelI>({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerifiedAt: {
        type: Date,
        required: false,
        default: null
    },
    phone: {
        type: String,
        required: false,
        index: true,
        default: null
    },
    phoneVerifiedAt: {
        type: Date,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: false,
        default: null
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    blockedAt: {
        type: Date,
        required: false,
        default: null
    },
    message: {
        type: String,
        required: false,
        default: null
    }
},{
    timestamps:true,
    toObject: {
        transform(doc, ret, options){
            delete ret.password;
            return ret
        }
    },
    toJSON:{
        transform(doc, ret, options){
            delete ret.password;
            return ret
        }
    }
});

userSchema.pre('save', async function(next){
    console.log("hash password")
    if(!this.isModified('password')){
        next();
    }
    const salt = await genSalt(config.get<number>('password.hash-salt'));
    this.password = await hash(this.password, salt);
    next();
})

userSchema.static('findByEmail', async function (email:string):Promise<UserModelI|null>{
    return await this.findOne({email})
})

userSchema.static('login', async function(email:string, password:string):Promise<null|UserModelI>{
    const user:any = await this.findOne({email});
    if(!user) return null;
    if(await compare(password, user.password)) return user;
    return null;

})

userSchema.static('createToken', function():AuthToken{
   return {authToken: "", refreshToken: ""}
})

export const UserModel = model<User, UserModelI>('User', userSchema);




