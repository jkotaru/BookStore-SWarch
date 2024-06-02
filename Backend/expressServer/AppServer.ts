import * as cors from 'cors';
import { App } from './App';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
let server: any = new App().express;
server.use(cors({origin : "*"}));
server.listen(port);

console.log("server running on port " + port);
