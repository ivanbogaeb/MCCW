async function loadFont(){
    if (MCCW.properties.font.custom){
        let link = document.createElement('link');
        link.id = 'custom-font';
        link.rel = 'stylesheet';
        link.href = MCCW.properties.font.url;
        document.head.appendChild(link);
        document.body.style.fontFamily = MCCW.properties.font.name;
        MCCW.properties.font.name = "custom-font";
        MCCW.widgets.media.redraw();
        if (MCCW.properties.font.bold){
            document.getElementById("dateContainer").style.fontWeight = "bold";
            document.getElementById("time").style.fontWeight = "bold";
            document.getElementById("weatherTitle").style.fontWeight = "bold";
            document.getElementById("scheduleTitle").style.fontWeight = "bold";
        }
    } else {
        document.body.style.fontFamily = "Odibee Sans";
        MCCW.properties.font.name = "Odibee Sans";
        MCCW.widgets.media.redraw();
        document.getElementById("dateContainer").style.fontWeight = "";
        document.getElementById("time").style.fontWeight = "";
        document.getElementById("weatherTitle").style.fontWeight = "";
        document.getElementById("scheduleTitle").style.fontWeight = "";
    }
}

var font_addon = {
    load: loadFont,
    properties: {
        url: "",
        bold: false,
        custom: false,
        name: "Odibee Sans",
    }
}