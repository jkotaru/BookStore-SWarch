import Mongoose = require("mongoose");
const uuid = require('uuid');
var crypto = require('crypto');
import { DataAccess } from "../DataAccess";
import { IUserModel } from "../interface/IUserModel";
import { users } from "./data";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel{

    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void{
        this.schema = new Mongoose.Schema<IUserModel>(
            {
                userId: {type: String, required: true, unique: true},
                userName: {type: String, required: false, unique: true},
                hashed_pwd: {type: String, required: false},
                password: {type: String, required: false},
                logInStatus: {type: Boolean, required: false},
                isAdmin: {type: Boolean, required: false},
                firstName: {type: String, required: false},
                lastName: {type: String, required: false},
                email: {
                    type: String,
                    required: false,
                    validate: {
                        validator: function(value: string) {
                            // Regular expression for validating email format
                            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                        },
                        message: "Invalid email format"
                    }
                },
                phoneNumber: {
                    type: String,
                    required: false,
                    validate: {
                        validator: function(value: string) {
                            return /^\d{10}$/.test(value); // Checks if the value is exactly 10 digits
                        },
                        message: "Phone number must be exactly 10 digits"
                    }
                },
                address: {type: String, required: false} 
            }
        )
    }

    public createModel(): void{
        this.model = mongooseConnection.model<IUserModel>("Users", this.schema);

    }

    public addMockUsers(){
        this.model.insertMany(users);
    }

    private hashPW(pwd) {
        return crypto.createHash('sha256').update(pwd).digest('base64').toString();
    }
    
    
}

export { UserModel }