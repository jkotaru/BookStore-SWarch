import Mongoose = require("mongoose");
import { DataAccess } from './../DataAccess';
import { IProductModel } from "../interface/IProductModel";
import { products } from "./data";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ProductModel {

    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }


    public createSchema(): void {
        this.schema = new Mongoose.Schema<IProductModel>(
            {
                productId: { type: String, required: true, unique: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                author: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                imageUrl: { type: String, required: true },
                publisher: { type: String },
                publicationDate: { type: String },
                genre: { type: String, required: true },
            },
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IProductModel>("Products", this.schema);
    }
    
    public addMockData(){
        this.model.insertMany(products);
    }
    
}

export { ProductModel };