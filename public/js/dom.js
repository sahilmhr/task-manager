function getData(tasks){
    for (let i =1; i < tasks.length+1; i++){
        let date = document.getElementById(`due${i}`);
        date.value = tasks[i-1].due;
        let priority = document.getElementById(`priority${i}`);
        priority.value = tasks[i-1].priority;
        let status = document.getElementById(`status${i}`);
        status.value = tasks[i-1].status;
    }
}


async function getTask(){
    const response = await fetch("/todos",{method:'GET'});
    const tasks = await response.json();

    for (let i = 1;i<tasks.length+1;i++){
        let table = document.getElementById("tbody");
       table.innerHTML += "<div id='pop"+i+"' class='popup'><i onclick='hide("+i+")' class='cross fa fa-close'></i><div class='edit-form'><span class='edit-title'>Edit Task #"+i+"</span><br><br><span class='task-item'>change due date</span><input class='task-form' required placeholder='Due Date' type='date' id='due"+i+"'><br>"+
    "<span class='task-item'>change Priority</span><br>"+
    "<select class='task-form' name='priority' id='priority"+i+"'>"+
        "<option value='Low'>Low</option>"+
        "<option value='Medium'>Medium</option>"+
        "<option value='High'>High</option>"+
    "</select>"+
    "<br>"+
    "<span class='task-item'>status</span><br>"+
    "<select class='task-form' name='status' id='status"+i+"'>"+
        "<option value='Incomplete'>Incomplete</option>"+
        "<option value='Complete'>Complete</option>"+
    "</select>"+
    "<button onclick='editForm("+i+")' class='btn'>update task</button>"+
"</div>"+
"</div>"+
"<div id='notes-pop"+i+"' class='popup'><i onclick='hide_notes("+i+")' class='fa cross fa-close'></i>"+
"<span class='task-item'>add new note</span>"+
"<input type='text' class='task-form' id='notes-new"+i+"'>"+
"<button class='btn' onclick='addNotes("+i+")'>add note</button>"+
"</div>"+
"<tr id='notes"+i+"'>"+
"<td class='click' onclick='show_notes("+i+")'>"+tasks[i-1].due+"</td>"+
"<td>"+tasks[i-1].title+"</td>"+
"<td>"+tasks[i-1].description+"</td>"+
"<td>"+tasks[i-1].priority+"</td>"+
"<td>"+tasks[i-1].status+"</td>"+
"<td><a href='#'><i onclick='show("+i+")' class='far ed fa-edit'></i></a></td>"+
"<td><a href='#'><i onclick = 'details("+i+")' class='fas ed fa-info-circle'></i></a></td>"+
"</tr>"
    }
    getData(tasks);
    return tasks;
}


getTask();