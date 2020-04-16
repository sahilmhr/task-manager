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
    const today = new Date();
    if (today > due){
        return res.status(400).send({"error":"Enter a date greater than today"});
    }
    const priority = req.body.priority;
    const task = {
        'title': title,
        'description': desc,
        'due': due,
        'priority': priority,
        'status': 'Incomplete'
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
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
    }

    const task = await Task.findByPk(parseInt(req.params.id));
    res.send(task);
});

route.get("/notes/:id",async (req,res)=>{

    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
    }

    const task = await Task.findByPk(parseInt(req.params.id));
    const notes =await task.getNotes();
    res.send(notes);
});

route.post("/notes/:id", async (req,res)=>{

    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
    }

    const data = {'data':req.body.data};
    Note.create(data).then(async (note)=>{
        const task = await Task.findByPk(parseInt(req.params.id));
        console.log(task);
        task.addNotes(note);
        return res.status(201).send({'message':`Note added with id ${note.id}`});
    }).catch((err)=>{
        return res.status(400).send({'error':err});
    });
});

route.patch('/:id',async (req, res)=>{

    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
    }

    const due = new Date(req.body.due);
    const today = new Date();
    if (today > due){
        return res.status(400).send({"error":"Enter a date greater than today"});
    }
    const priority = req.body.priority;
    const status = req.body.status;
    await Task.update({'due':due,'priority':priority,'status':status}, {
        where: {
            id: parseInt(req.params.id),
        }
    });
    return res.status(202).send({'message':`Task with id ${req.params.id} updated`});
});

module.exports = route;