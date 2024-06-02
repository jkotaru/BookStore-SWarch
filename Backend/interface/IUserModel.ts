import Mongoose = require("mongoose")

interface IUserModel extends Mongoose.Document {
    userId: string;
    userName: string;
    password: string;
    logInStatus: boolean;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: 'admin' | 'user';
}

export { IUserModel };