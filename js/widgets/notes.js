function checkNotesIntegrity(notes){
    let flag = true;
    for (let i = 0; i < notes.length; i++){
        if (typeof notes[i] !== "string"){
            flag = false;
        }
    };
    return flag;
}

function processNotes(fileFlag, notes){
    let integrity = checkNotesIntegrity(notes);
    if (integrity){
        if (fileFlag){
            console.log("Notes file is valid.");
        }
        document.getElementById("notes").innerHTML = "";
        try {
            notes.map(function(note){
                let a = document.createElement('a');
                let br = document.createElement('br');
                a.innerHTML = note;
                let children = [...a.childNodes];
                children.forEach(element => {
                    element.innerText = element.innerHTML;
                });
                document.getElementById("notes").appendChild(a).appendChild(br);
            });
        } catch (error) {
            alerts("Notes Error:", `Cannot load notes, there is an error here.\n\n${error}`);
        }
    } else {
        alerts("Notes Error:", `Cannot load notes, there must be an error in them.`);
    };
}


async function drawNotesWidget(){
    try {
        if (notes){
            processNotes(true, notes);
        }
    } catch (error){
        alerts("Notes Error:", `Cannot load notes, there must be an error in them.\n\n${error}`);
    };
}

var notes_widget = {
    draw: drawNotesWidget,
    properties: {
        active: true,
        readFile: true,
    }
}