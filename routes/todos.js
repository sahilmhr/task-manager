const {
    Router
} = require("express");
const {
    Task,
    Note
} = require("../db");

const route = Router();

Task.hasMany(Note);
Note.belongsTo(Task);

route.get("/", async (req, res) => {
    const tasks = await Task.findAll();
    res.send(tasks);
});

route.post("/", async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    if (desc === null) {
        desc = "No Description";
    }
    const due = new Date(req.body.due);
    const priority = req.body.priority;
    const task = {
        'title': title,
        'description': desc,
        'due': due,
        'priority': priority
    };
    Task.create(task)
        .then((t) => {
            return res.status(201).send({
                'message': `Task Added with id ${t.id}`
            });
        })
        .catch((err) => {
            return res.status(400).send({
                'error': err
            });
        });
});

route.get("/:id", async (req, res) => {
    const task = await Task.findByPk(parseInt(req.params.id));
    res.send(task);
})

module.exports = route;