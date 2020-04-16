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

//Popup Show

function show_notes(num){
    const pop = document.getElementById(`notes-pop${num}`);
    pop.style.display = 'block';
}

//Popup Hide

function hide_notes(num){
    const pop = document.getElementById(`notes-pop${num}`);
    pop.style.display = 'none';
}

function sortTable(n) { 
    var table; 
    table = document.getElementById("table"); 
    var rows, i, x, y, count = 0; 
    var switching = true; 
    var direction="ascending";
    while (switching) { 
        switching = false; 
        var rows = table.rows; 
 
        for (i = 1; i < (rows.length - 1); i++) { 
            var Switch = false; 
 
            x = rows[i].getElementsByTagName("TD")[n]; 
            y = rows[i + 1].getElementsByTagName("TD")[n]; 
 
            var a = x.innerHTML.toLowerCase()
            var b = y.innerHTML.toLowerCase()
        
        if(n===3) {
            
            if(a==='High'){a=3}
           
            if(b==='High'){b=3}
            
            if(a==='Medium'){a=2}
            
            if(b==='Medium'){b=2}
            
            if(a==='Low'){a=1}
            
            if(b==='Low'){b=1}
        }
        
        if (direction == "ascending") { 
                if (a > b) 
                {   Switch = true; 
                    break; }
            } else if (direction == "descending") { 
 
                if (a < b) 
                {  Switch = true; 
                    break; } 
            } 
        } 
        if (Switch) { 
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
            switching = true; 
            count++; 
 
        } else { 
            if (count == 0 && direction == "ascending") { 
                direction = "descending"; 
                switching = true; 
            }  
        } 
    } 
}