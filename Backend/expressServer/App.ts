import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { UserModel } from '../model/UserModel';
import { ProductModel } from '../model/ProductModel';

class App {
    public express: express.Application;
    private userModel: UserModel;
    private productModel: ProductModel;

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
            
            this.userModel.userLogin(req,res);
        })
        
        router.post("/register",(req,res) => {
            
            this.userModel.createUser(req,res);
        })

        router.get("/account/:userId", (req,res) => {
            
            this.userModel.showUserInfo(req,res);
        })
        
        router.put("/account/update",(req,res) => {
            
            this.userModel.updateUserInfo(req,res);
        })

        this.express.use(router);
    }
}


export { App };
