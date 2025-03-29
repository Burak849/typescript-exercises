"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = addTodo;
exports.getTodo = getTodo;
exports.getTodos = getTodos;
exports.removeTodo = removeTodo;
exports.updateTodo = updateTodo;
let TODOS = [];
function addTodo(text) {
    const newTodo = { id: Math.random(), text };
    TODOS.push(newTodo);
    return newTodo;
}
function getTodo(id) {
    const todo = TODOS.find(t => t.id === id);
    if (!todo) {
        throw new Error('Todo not found');
    }
    return todo;
}
function getTodos() {
    return TODOS;
}
function removeTodo(id) {
    TODOS = TODOS.filter(t => t.id !== id);
}
function updateTodo(id, text) {
    const todo = getTodo(id);
    todo.text = text;
    return todo;
}
