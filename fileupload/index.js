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

const uploadDirectory = "C:\\Users\\Vinke\\OneDrive\\Documents\\Uploads"

app.use(fileUpload());

app.get('/upload' ,(req,res) =>{
    res.sendFile('index.html', { root: __dirname })
})

// Create a route to handle the file upload
app.post("/uploaded", (req, res) => {
    if (!req.files || !req.files.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
  
    const file = req.files.file;
  
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