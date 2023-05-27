/*
Site that asks for a file to Upload then send the file to a directory 
and displays Success Message
*/

const express = require ('express')
const fs = require('fs')
const path = require('path')
const fileUpload = require('express-fileupload');

const app = express()
const port = 3000

const uploadDirectory = "Path you want file to be uploaded to "  //add your path for the file to be saved. add extra \ next to ones in path

//middleware
app.use(fileUpload());

// gets the html file from a directory to be displayed when connected to localhost:3000/upload
app.get('/upload' ,(req,res) =>{
    res.sendFile('index.html', { root: __dirname }) //__dirname specifies the root directory from which to serve the file
})

// Create a route to handle the file upload
app.post("/uploaded", (req, res) => {
    if (!req.files || !req.files.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
  ////req is the request object that represents the HTTP request. Files is the propery that holds the uploaded files info. file is the name of the field in the form
    const file = req.files.file; 

    //variable of the allowed file ext stored in an array
    const allowedExtensions = ['.txt','.pdf']

    // Checks for the file ext type to determine if valid
    const fileExt = path.extname(file.name).toLowerCase()
    if (!allowedExtensions.includes(fileExt)){
      res.status(400).send('Invalid File Type')
      return;
    }
  
    // Generate a unique filename
    const filename = Date.now() + "-" + file.name;
  
    // Construct the path to save the file
    const filePath = path.join(uploadDirectory, filename);
  
    // Save the file
    fs.writeFile(filePath, file.data, (err) => {
        if (err) {
          console.error("Error saving the file:", err);
          res.status(500).send("Error saving the file.");
        } else {
          console.log("File uploaded successfully.");
          // Send the uploaded file as a response
          res.sendFile(filePath);
        }
        res.send('<h1>Uploaded Succesfully!</h1>')
    });
});

//start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });