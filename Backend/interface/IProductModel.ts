import Mongoose = require("mongoose");
interface IProductModel extends Mongoose.Document {
    productId: string;
    title: string;
    description: string;
    author: string;
    price: number;
    quantity: number;
    imageUrl: string;
    publisher: string;
    publicationDate: string;
    genre: string;
}
export {IProductModel};