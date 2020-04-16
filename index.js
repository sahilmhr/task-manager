const express = require("express");
const todoRoute = require('./routes/todos');
const {db} = require("./db");

const app = express();

let PORT = process.env.PORT || 3333;

db.sync();

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use('/',express.static(__dirname + '/public'));

app.use('/todos', todoRoute)

app.listen(PORT,(err)=>{
    if (!err){
        console.log("Server Started");
    } else {
        console.log(err);
    }
});