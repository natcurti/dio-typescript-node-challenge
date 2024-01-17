import express, {Request, Response} from 'express';
import { router } from './routes';
import { AppDataSource } from './database';
import 'reflect-metadata';

const server = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

server.use(express.json());
server.use(router);

server.get('/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'DIO BANK'})
})

server.listen(5000, () => {console.log('Server On Update')});
