import * as cors from 'cors';
import { App } from './App';

const port = 8080;
let server: any = new App().express;
server.use(cors({origin : "*"}));
server.listen(port);

console.log("server running on port " + port);
