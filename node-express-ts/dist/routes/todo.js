"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_js_1 = require("../data.js");
const router = express_1.default.Router();
// function handlePost(req: Request, res: Response ){
// } this is the complex way and you gotta import , {Request, Response}
router.post('/todos', (req, res) => {
    const text = req.body.text;
    const addedTodo = (0, data_js_1.addTodo)(text);
    res.json({ message: 'Todo added!', todo: addedTodo });
});
router.get('/todos', (req, res) => {
    const todos = (0, data_js_1.getTodos)();
    res.json({ todos });
});
router.get('/todos/:id', (req, res) => {
    const todo = (0, data_js_1.getTodo)(+req.params.id);
    res.json({ todo });
});
router.patch('/todos/:id', (req, res) => {
    const updatedTodo = (0, data_js_1.updateTodo)(+req.params.id, req.body.text);
    res.json({ message: 'Todo updated', todo: data_js_1.updateTodo });
});
router.delete('/todos/:id', (req, res) => {
    const deletedTodo = (0, data_js_1.removeTodo)(+req.params.id);
    res.json({ message: 'Todo deleted' });
});
exports.default = router;
