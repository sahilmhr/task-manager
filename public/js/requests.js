function editForm(num){
    let date = document.getElementById(`due${num}`);
    let priority = document.getElementById(`priority${num}`);
    let status = document.getElementById(`status${num}`);
    
    async function getData(){
        const response = await fetch(`/todos/${num}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `due=${date.value}&priority=${priority.value}&status=${status.value}`
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    getData();
}


function show_notes(num){
    let note = document.getElementById(`notes-pop${num}`);
    note.innerHTML = "<i onclick='hide_notes("+num+")' class='fa cross fa-close'></i>"+
    "<div class='c'>"+
    "<span class='task-item'>add new note</span>"+
    "<input type='text' class='task-form' id='notes-new"+num+"'>"+
    "<button class='btn' onclick='addNotes("+num+")'>add note</button>"+
    "</div>"
    async function getNote(){
        const response = await fetch("/todos/notes/"+num);
        const json = await response.json();
        console.log(json);
        let ul = document.createElement("ul");
        for (let i = 0; i < json.length; i++){
            let li = document.createElement("li");
            li.innerHTML = json[i].data;
            ul.append(li);
        }
        note.append(ul);
        return  json;
    }

    getNote();

    let pop = document.getElementById(`notes-pop${num}`);
    pop.style.display = 'block';
}

function addNotes(num){
    let note = document.getElementById('notes-new'+num);
     async function addNote(){
         const response = await fetch("/todos/notes/"+num,{
             method : 'POST',
             headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
             },
             body : `data=${note.value}`
         });
         const json = await response.json();
         console.log(json);
         return json;
     }

     addNote();
}

function formData(){
    let title = document.getElementById("t").value;
    let desc = document.getElementById("description").value;
    let due = document.getElementById("due").value;
    let priority = document.getElementById("priority").value;

    async function fD(){
        const response = await fetch("/todos",{
            method: 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `title=${title}&desc=${desc}&due=${due}&priority=${priority}`
        });
        const json = await response.json();
        return json;
    }

    fD();
}