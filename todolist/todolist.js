const express = require('express')

const app = express()
const port = 3000

let todos = ['item2', 'item2','item3']

//display the todos
app.get('/todos', (req,res) => {
  res.json(todos)
})

//add new todos
app.post('/todos/new', (req,res) =>{
    //capture text entered into the add field
    const todo = req.body.todo
    if (todo){
        todos.push(todo)
        res.sendStatus(200)
    }
    else{
        res.sendStatus(400)
    }

})

//delete todos
app.delete('/todos/:id/delete', (req,res) =>{
    const id = req.params.id
    if (id >= 0 && id < todos.length) {
        todos.splice(id, 1);
        res.sendStatus(200);
    } 
    else {
        res.sendStatus(400);
      }
})
//delete all todos
app.delete('/todos/deleteall', (req,res) =>{
    todos = []
    res.sendStatus(200) 
})

//the server is listening on port 3000 for connections
app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
