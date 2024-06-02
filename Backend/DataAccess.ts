import Mongoose = require("mongoose");
import * as dotenv from 'dotenv';
dotenv.config();

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();

export {DataAccess};



