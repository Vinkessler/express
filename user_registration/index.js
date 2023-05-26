const express = require('express')
const path = require('path')

const app = express()
const port = 3000

let users = []

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/registration' ,(req,res) =>{
    res.sendFile('C:\\Users\\Vinke\\OneDrive\\Documents\\BuildaDev\\Node\\Express\\user_registration\\index.html')
})

//add the new user
app.post('/register', (req,res) =>{
    //capture text entered into the add field
    const {name,email,password} = req.body

    const user = {name,email,password} //user = {name:name, email:email, password:password}
       
        users.push(user)
        res.send(`
            <h1>Registration Successful</h1>
        `)
})

//start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });