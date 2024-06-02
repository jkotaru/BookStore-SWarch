import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

class App {
    public express: express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
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

        
        this.express.use(router);
    }
}


export { App };

function next(err: any) {
    throw new Error('Function not implemented.');
}

