const Sequelize = require("sequelize");

const db = new Sequelize({
    dialect : 'sqlite',
    storage : 'task.db',
});

const Task = db.define('task', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.STRING(70),
        allowNull : false
    },
    description : {
        type : Sequelize.STRING(300),
    },
    due : {
        type : Sequelize.DATEONLY,
        allowNull : false
    },
    status : {
        type : Sequelize.STRING(20),
        defaultValue : 'Incomplete'
    },
    priority:{
        type : Sequelize.STRING(10),
        defaultValue : 'Medium'
    }
});

const Note = db.define('note',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    data : {
        type : Sequelize.STRING(200),
        allowNull : false
    }
});


module.exports = {db, Task, Note};