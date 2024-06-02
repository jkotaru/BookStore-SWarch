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
    
    public async createUser(request: any, response: any) {
        const userData = request.body;
        const existingUser = await this.model.findOne({ userId: userData.userId });

        if (existingUser) {
            return response.status(400).json({ message: "User already exists" });
        }

        const userId = uuid.v4();
        const hashedPwd = this.hashPW(userData.password);
        const newUser = new this.model({
            userId: userId,
            userName: userData.userName,
            hashed_pwd: hashedPwd,
            password: userData.password,
            logInStatus: false,
            isAdmin: false,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            address: userData.address
        });
        newUser.save();
        response.status(200).json({message: "User data added to database!"});
    }

    public userLogin(request: any, response: any, callback: (userId: string) => void){
        let userName, password;
        userName = request.body.userName;
        password = request.body.password;
        //console.log(password);
        var query = this.model.findOne({ userName: userName });
        query.exec((err, user) => {
            if (err) {
                console.error("Error while retrieving user with the given User Name:", err);
                response.status(500).json({ error: "An error occurred while retrieving user with the given User Name" });
            } else {
                if (user && this.hashPW(password) === user.hashed_pwd) {
                    request.session.user = {
                        userId: user.userId
                    }
                    //request.session.username = user.userName;
                    callback(user.userId);
                    response.status(200).json({ message: "Login successful", userId: user.userId});
                } else {
                    response.status(401).json({ message: "Incorrect userName/password"});
                }
            }
        });
    }

    public showUserInfo(request: any, response: any){
        //let userId = request.body.userId;
        let userId = request.params.userId;
        var query = this.model.findOne({ userId: userId })
        query.exec(( err, user) => {
            if (err){
                console.log("Error retrieving the requested user info...")
                response.status(500).json("An error occurred while retrieving user with the given id")
            }
            else{ 
                response.status(200).json(user)  
            }         
        })
    }

    public updateUserInfo(request: any, response: any){
        //console.log(request.body);
        let userId = request.body.userId;
        var query = this.model.findOne({ userId: userId})
        query.exec(( err, user) => {
            if (err){
                console.log("Error retrieving the requested user info...")
                response.status(500).json("An error occurred while retrieving user with the given id")
            }
            else{
                user.userName = request.body.userName,
                user.hashed_pwd = this.hashPW(request.body.password),
                user.password = request.body.password,
                user.logInStatus = user.logInStatus,
                user.isAdmin = user.isAdmin,
                user.firstName = request.body.firstName,
                user.lastName = request.body.lastName,
                user.email = request.body.email,
                user.phoneNumber = request.body.phoneNumber,
                user.address = request.body.address,
                user.zipcode = request.body.zipcode
                             
                user.save()  
                response.status(200).json("User Info has been updated!")  
            }         
        })
    }

    public async retrieveUserbyName(userName){
        this.model.findOne({ userName: userName });
    }
    
}

export { UserModel }