const express = require('express');
const logger = require('morgan');
const nedb = require('nedb');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

const app = express();
// populated a veriable called req.body if the user is sbmitting a form
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(logger('dev'));

app.get("/", (req, res) =>{
    res.send("hello from nautilist public")
})


app.get("/ping", (req, res) =>{
    res.send("Nautilist Public says, 'pong'")
})



http.createServer(app).listen(port, () => {
    console.log(`Nautilist Public running at: http://localhost:${port}`)
})