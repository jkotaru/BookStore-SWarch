import Mongoose = require("mongoose");
import { ITransactionModel } from "../interface/ITransactionModel";
import { DataAccess } from "../DataAccess";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;
const uuid = require('uuid');

class TransactionModel {

    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void{
        this.schema = new Mongoose.Schema<ITransactionModel>(
            {
                transactionId: { type: String, required: true, unique: true },
                userId: { type: String, required: true},
                totalPrice: { type: Number, required: true},
                items:[
                    {
                        productId: { type: String, required: true},
                        quantity: { type: Number, required: true },
                        price: { type: Number, required: true }
                    }
                ]
            }
        )
    }

    public createModel(): void{
        this.model = mongooseConnection.model<ITransactionModel>("Transactions", this.schema);
    }

    public async createTransaction(req,res) {
        const transactionData = req.body;

        const items = transactionData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        const transactionId = uuid.v4();
        const newTransaction = new this.model({
            transactionId: transactionId,
            userId: transactionData.userId,
            totalPrice: transactionData.totalPrice,
            items: items
        });

        try {
            // Save the transaction to the database
            await newTransaction.save();

            // Send a success response
            res.status(201).json({
                message: 'Transaction created successfully',
                data: newTransaction
            });
        } catch (error) {
            // Handle errors and send an error response
            res.status(500).json({
                message: 'Failed to create transaction',
                error: error.message
            });
        }
    }

}

export { TransactionModel }