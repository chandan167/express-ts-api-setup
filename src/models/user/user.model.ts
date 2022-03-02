import { Schema, model } from 'mongoose';


export interface User {
    _id?: string;
    name: string;
    avtar?: string;
    email: string;
    emailVerifyedAt?: Date;
    phone?: string;
    phoneVerifyedAt?: Date;
    password: string;
    lastLogin?: Date;
    isOnline?:boolean;
    blockedAt?: Date;
    message?: string;
    createedAt?: Date;
    updatedAt?: Date;
    roles?: string[]
}

const userScheam = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    avtar: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerifyedAt: {
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
    phoneVerifyedAt: {
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

export const UserModel = model<User>('User', userScheam);