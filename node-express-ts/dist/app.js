"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_js_1 = __importDefault(require("./routes/todo.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for json datas
app.use(todo_js_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: "An error occured!" });
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
