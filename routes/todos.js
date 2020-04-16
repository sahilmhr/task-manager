const {Router} = require("express");
const {Task, Note} = require("../db");

const route = Router();

Task.hasMany(Note);
Note.belongsTo(Task);

route.get("/", async (req,res)=>{
    const tasks = await Task.findAll();
    res.send(tasks);
});

module.exports = route;