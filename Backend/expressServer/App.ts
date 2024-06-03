import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { UserModel } from '../model/UserModel';
import { ProductModel } from '../model/ProductModel';
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

class App {
    public express: express.Application;
    private userModel: UserModel;
    private productModel: ProductModel;
    static userCheck: string;

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
        this.userModel = new UserModel();
        this.productModel = new ProductModel();
    }

    private middleware(): void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false}));
        this.express.use(cors());
        this.express.use(session({
            secret: "secret",
            resave: false ,
            saveUninitialized: true ,
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
    }

    private validateAuth(req, res, next):void {
        let userId = req.params.userId;
        // console.log('userId: ',userId);
        // console.log('check: ',App.userCheck);
        if (userId == App.userCheck) { 
          console.log("user is authenticated"); 
          //console.log(JSON.stringify(req.user));
          return next(); }
        console.log("user is not authenticated");
        // res.redirect('http://localhost:4200/');
        res.status(403).send('Access Denied');
    }


    private routes(): void{     

        let router = express.Router();

        router.get('/', (req, res) => {
            res.json('Send user details to the frontend as JSON');
        });

        router.post('/',(req, res)=>{ 
            this.userModel.addMockUsers();
            this.productModel.addMockData();
            res.send("Mock data is added into db !");
        })

        router.post("/login",(req,res) => {

            this.userModel.userLogin(req, res, (userId: string) => {
                App.userCheck = userId;
            });
        });
        
        router.post("/register",(req,res) => {
            
            this.userModel.createUser(req,res);
        })

        router.post("/logout",(req,res) =>{

            App.userCheck = '';
            res.status(200).json({'message': 'user successfully logged out', userId: App.userCheck});
        })

        router.get("/account/:userId", this.validateAuth, (req,res) => {
            
            this.userModel.showUserInfo(req,res);
        })
        
        router.put("/account/update",(req,res) => {
            
            this.userModel.updateUserInfo(req,res);
        })

        router.get("/products",(req,res) => {

            this.productModel.getProducts(req, res);
        })

        router.get("/search/products",(req,res) => {

            console.log("entered search")
            this.productModel.filterProductsByTitle(req,res);
        })

        router.put("/products/update",(req,res) => {
            
            this.productModel.updateProductInfo(req,res);
        })

        router.get("/products/category",(req,res) => {
            
            this.productModel.getProductCategories(req,res);
        })

        router.get("/products/category/:genre",(req,res) => {
            
            this.productModel.getProductsByCategory(req,res);
        })

        router.get("/products/:productId",(req,res) => {

            this.productModel.getProductById(req, res);
        })

        router.delete("/products/:productId",(req,res) => {

            this.productModel.deleteProduct(req, res);
        })

        router.post("/products",(req,res) => {

            this.productModel.createProduct(req,res);
        })

        router.put("/products/:productId",(req,res) => {

            this.productModel.updateProduct(req, res);
        })


        this.express.use(router);
    }
}


export { App };
