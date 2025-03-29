import express, { type Request, type Response } from "express";
import { addTodo, getTodo, getTodos, removeTodo, updateTodo } from "../data.ts"; // if we are compiling this we must make it ts

// enum TODO_TYPE{
//     BASIC,
//     URGENT
// }


const router = express.Router();
// function handlePost(req: Request, res: Response ){

// } this is the complex way and you gotta import , {Request, Response}
router.post('/todos', (req, res) => {
    const text = req.body.text; 

    const addedTodo = addTodo(text);
    res.json({ message: 'Todo added!', todo: addedTodo});

});

router.get('/todos', (req, res) => {
   const todos = getTodos();
   res.json({todos});
});

router.get('/todos/:id', (req, res)=>{
    const todo = getTodo(+req.params.id);
    res.json({todo});
});

router.patch('/todos/:id', ( req, res ) => {
    const updatedTodo = updateTodo(+req.params.id, req.body.text);
    res.json({ message: 'Todo updated', todo: updateTodo });
});

router.delete('/todos/:id', ( req, res ) => {
    const deletedTodo = removeTodo(+req.params.id);
    res.json({ message: 'Todo deleted'});
});
export default router;