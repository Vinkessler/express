const express = require("express")
const https = require("https")

const app = express()
const port = 3000

app.get("/api/data", (req,res) => {
    const options = {
        hostname: "rickandmortyapi.com",
        path: "/api/character/108",
        method: "GET"
    }
    const request = https.request(options, (response) =>{
        let data = ""

        response.on("data", (chunk) =>{
            data += chunk
        })
        response.on("end", () => {
            res.json(JSON.parse (data))
        })
    })
    request.on('error', (error) =>{
        console.error('error', error.message)
    })
    request.end()
})

app.listen(port, () =>{
    console.log('listening on port 3000')
})
