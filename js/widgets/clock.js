function drawWidgetClock(){
    let date = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: MCCW.date.hour12
    });
    
    // If 24hs format is true -> if it's 24hs mark -> replace 24 for 00, or do nothing, or do nothing.
    if (MCCW.date.hour12){
        if (date.slice(0, 3) == "24:"){
            date = date.replace("24:", "00:");
        };
    };

    if (!MCCW.date.hour12 && date.slice(date.length - 2, date.length) == "AM"){
        date = date.replace("12:", "00:");
    };

    document.getElementById("time").getElementsByTagName("span")[0].innerHTML = date;
};

var clock_widget = {
    draw: drawWidgetClock,
};