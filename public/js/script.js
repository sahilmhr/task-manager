//Default date tommorrow

const date = document.getElementById('due');
const tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
date.value = tomorrowLocal


//Popup Show

function show(num){
    const pop = document.getElementById(`pop${num}`);
    pop.style.display = 'block';
}

//Popup Hide

function hide(num){
    const pop = document.getElementById(`pop${num}`);
    pop.style.display = 'none';
}

//Edit Form request
async function call(){
    const response = await fetch("/demo",{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "task=New Task",
    });
    const json = await response.json();
    console.log(json);
}
