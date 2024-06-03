import Mongoose = require("mongoose")

interface ITransactionModel extends Mongoose.Document {
    transactionId: string;
    userId: string;
    items:[
        {
            productId: string;
            quantity: number;
            price: number;
        }
    ]
    totalPrice: number;
}

export { ITransactionModel };