import Mongoose = require("mongoose");
import { DataAccess } from './../DataAccess';
import { IProductModel } from "../interface/IProductModel";
import { products } from "./data";
const uuid = require('uuid');
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

    public async getProducts(req, res) {
        try {
          const products = await this.model.find();
          res.status(200).json(products);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      // Get product by ID
      public async getProductById(req, res){
        try {
          const product = await this.model.findOne({ productId: req.params.productId });
          if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
          }
          res.json(product);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      // Create a new product
      public async createProduct(req, res){
        const productData = req.body;

        const productId = uuid.v4();
        const newProduct = new this.model({
            productId: productId,
            title: productData.title,
            description: productData.description,
            author: productData.author,
            price: productData.price,
            quantity: productData.quantity,
            imageUrl: productData.imageUrl,
            publisher: productData.publisher,
            publicationDate: productData.publicationDate,
            genre: productData.genre
        });
        newProduct.save();
        res.status(200).json({message: "User data added to database!"});
      };
      
      // Update a product
      public async updateProduct(req, res){
        try {
          const product = await this.model.findOne({ productId: req.params.productId });
          if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
          }
      
          product.title = req.body.title,
          product.description = req.body.description,
          product.author = req.body.author,
          product.price = req.body.price,
          product.quantity = req.body.quantity,
          product.imageUrl = req.body.imageUrl,
          product.publisher = req.body.publisher,
          product.publicationDate = req.body.publicationDate,
          product.genre = req.body.genre
      
          const updatedProduct = await product.save();
          res.json(updatedProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      };
      
      // Delete a product
      public async deleteProduct(req, res){
        try {
          const product = await this.model.findOne({ productId: req.params.productId });
          if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
          }
      
          await product.remove();
          res.json({ message: 'Deleted Product' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      public async getProductCategories(req,res){
        try {
          const categories = await this.model.distinct('genre');
          res.status(200).json(categories);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }

      public async getProductsByCategory(req, res) {
        try {
            const genre = req.params.genre;
            const products = await this.model.find({ genre });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    public updateProductInfo(request: any, response: any){
      //console.log(request.body);
      let productId = request.body.productId;
      var query = this.model.findOne({ productId: productId})
      query.exec(( err, product) => {
          if (err){
              console.log("Error retrieving the requested product info...")
              response.status(500).json("An error occurred while retrieving prduct with the given id")
          }
          else{
              product.title = request.body.title,
              product.description = request.body.description,
              product.author = request.body.author,
              product.price = request.body.price,
              product.quantity = request.body.quantity,
              product.imageUrl = request.body.imageUrl,
              product.publisher = request.body.publisher,
              product.publicationDate = request.body.publicationDate,
              product.genre = request.body.genre
                           
              product.save()  
              response.status(200).json("Product Info has been updated!")  
          }         
      })
    }

    public async filterProductsByTitle(req,res) {
      try
      {
        const query = req.query.query.toLowerCase();
        //console.log(query);
        const filteredProducts = await this.model.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json(filteredProducts);
      }
      catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    
}

export { ProductModel };