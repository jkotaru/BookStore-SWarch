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
        const product = new this.model({
          picture: req.body.picture,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          quantity: req.body.quantity,
        });
      
        try {
          const newProduct = await product.save();
          res.status(201).json(newProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      };
      
      // Update a product
      public async updateProduct(req, res){
        try {
          const product = await this.model.findOne({ productId: req.params.productId });
          if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
          }
      
          if (req.body.picture != null) {
            product.picture = req.body.picture;
          }
          if (req.body.name != null) {
            product.name = req.body.name;
          }
          if (req.body.price != null) {
            product.price = req.body.price;
          }
          if (req.body.description != null) {
            product.description = req.body.description;
          }
          if (req.body.quantity != null) {
            product.quantity = req.body.quantity;
          }
      
          const updatedProduct = await product.save();
          res.json(updatedProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      };
      
      // Delete a product
      public async deleteProduct(req, res){
        try {
          const product = await this.model.findById(req.params.id);
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
    
}

export { ProductModel };