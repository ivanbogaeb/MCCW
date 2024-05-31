function checkScheduleIntegrity(weekdays, schedule){
    let flag = 0;
    let entries = Object.keys(schedule);

    for (let i = 0; i < entries.length; i++){
        if (weekdays.includes(entries[i])){
            flag++;
        }
    };

    if (flag === 7){
        return true;
    };

    return false;
}

function processSchedule(file, schedule){
    let today = new Date().getDay();
    let weekdays = MCCW.variables.weekday.map((day) => {
        return day.toLowerCase();
    });

    let integrity = checkScheduleIntegrity(weekdays, schedule);
    if (integrity){
        document.getElementById("schedule").innerHTML = "";
        try {
            schedule[weekdays[today]].map(function (daySchedule){
                tr = document.createElement("tr");
                td = document.createElement("td");
                td.appendChild(document.createTextNode(daySchedule.hour));
                tr.appendChild(td);
                td = document.createElement("td");
                activity = "/ " + daySchedule.activity;
                tr.appendChild(document.createTextNode(activity));
                document.getElementById("schedule").appendChild(tr);
            });
        } catch (error){
            alerts("Schedule Error:", `Cannot load schedule, there is an error here.\n\n${error}`);
        }
    } else {
        alerts("Schedule Error:", `Cannot load schedule, there must be an error in there.`);
    };
}


async function drawScheduleWidget(){
    try {
        if (schedule){
            processSchedule(true, schedule);
        }
    } catch (error){
        alerts("Schedule Error:", `Cannot load schedule, there must be an error in there.\n\n${error}`);
    };
}

var schedule_widget = {
    draw: drawScheduleWidget,
    properties: {
        active: true,
        readFile: true, 
    }
}