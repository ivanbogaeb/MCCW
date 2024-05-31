function drawDate(){
    
    let month = MCCW.date.initial.getMonth();

    let year = MCCW.variables.month[month] + " " + MCCW.date.time[3];
    let today = MCCW.variables.weekday[new Date(MCCW.date.initial.getFullYear(), month, MCCW.date.time[2]).getDay()] + " /";

    document.getElementById("dateContainer").getElementsByTagName("span")[0].innerHTML = today;
    document.getElementById("dateContainer").getElementsByTagName("span")[1].innerHTML = year;
    
};

var date_widget = {
    draw: drawDate
}