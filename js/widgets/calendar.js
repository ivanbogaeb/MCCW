var calendar_widget = {
    draw: drawWidgetCalendar,
    fill: fillWidgetCalendar
};

function drawWidgetCalendar(){
    document.getElementById("calendar").innerHTML = "<tr><th>SU</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th></tr>";

    let month = MCCW.date.initial.getMonth();
    let days = new Date(MCCW.date.initial.getFullYear(), month + 1, 0).getDate();
    let elem = document.createElement("tr");
    let auxiliary = new Date(MCCW.date.initial.getFullYear(), month, 1).getDay();

    for (let i = 0; i < auxiliary; i++){
        loadCell("");
    };

    for (let i = 1; i <= days; i++){
        auxiliary = new Date(MCCW.date.initial.getFullYear(), month, i).getDay();
        if (MCCW.variables.weekday[auxiliary] == MCCW.variables.weekday[0]){
            document.getElementById("calendar").appendChild(elem);
            elem = document.createElement("tr");
            loadCell(i);
        } else {
            loadCell(i);
        }
    };

    function loadCell(data){
        elem.appendChild(document.createElement("td")).appendChild(document.createTextNode(data));
    };

    document.getElementById("calendar").appendChild(elem);
}


function fillWidgetCalendar(){
    let pastDayFlag = true; // Past day flag
    let days = document.getElementById("calendar").getElementsByTagName("td");
    for (let i = 0; i < days.length; i++){
        if (pastDayFlag){
            days[i].classList.add("past"); // Add past day class
        }
        if (days[i].innerHTML == MCCW.date.time[2]){
            days[i].classList.add("today"); // Add today's class
            pastDayFlag = false;
        }
    }
}