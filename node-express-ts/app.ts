import express, { type Request, type Response, type NextFunction} from 'express'; // we are declaring type Request ... because vanilla js doesnt has that libraries
import todoRoutes from './routes/todo.ts'

const app = express();

app.use(express.json()); // for json datas
app.use(todoRoutes);
app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: "An error occured!"});
});
app.listen(3000);


// app.get('/', ( req, res ) => {
//     console.log(req.method);
//     res.json({message: 'Hello World'}); // we printed json file by this
// });





//! Without expressjs
// import { createServer } from 'node:http'; // added 3rd party lib with npm install --save-dev @types/node

// const server = createServer( (req, res) => {
//     console.log(req.method);
//     res.end('Hello');
// });

// server.listen(3000); // basic server up and running