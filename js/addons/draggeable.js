/*

    --------------------------------------------------------------------------------------    
    THIS MODULE IS DEPRECATED, COPY BETWEEN WALLPAPER AND YOUR CLIPBOARD HAS BEEN DISABLED
    --------------------------------------------------------------------------------------

    This means that even if we rely on localStorage, there is no way to create predefined presets for users,
        that means all this implementation is useless and I am just not going to use it anymore.

    Maybe to you is useful for something else, but not anymore for this wallpaper.

    In theory, if you add the class "draggeable" to an element that has absolute position,
    it should be draggeable around the screen.
    
    N0XT
*/


var draggeable_addon = {
    elements: {
        list: [],
        data: {},
        position: "default",
        icons: {
            drag: document.createElement("div"),
            rotate: document.createElement("div"),
            success: document.createElement("div"),
            clipboard: document.createElement("div")
        }
    },
    properties: {
        active: true,
        dragEvent: {
            active: false,
            timeEvent: 9,
            interval: "",
            timer: 0,
            rotateValue: 0,
            activeIcon: false,
            element: "",
        },
        preset: {},
        screen: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        offset: 10,
    },
    start: initiateDragEvents,
    refresh: refreshDragEvents,
};


function fallbackDragEvents(){
    if (localStorage.getItem("draggeableElements")) {

        let screenSize = JSON.parse(localStorage.getItem("screenSize"));
        let draggeableElements = JSON.parse(localStorage.getItem("draggeableElements"));

        let keys = Object.keys(draggeableElements);

        if (keys.includes("monthYear") || keys.includes("contenedorHora") || keys.includes("contenedorClima") ||
            keys.includes("contenedorCalendario") || keys.includes("contenedorCronogramaNotas")){ // If we are on the v1, this key should pop up

            let x_offsets = [ // Array of offsets, by default all X offsets are 0
                draggeableElements.monthYear.offset[0],
                draggeableElements.contenedorHora.offset[0],
                draggeableElements.contenedorClima.offset[0],
                draggeableElements.contenedorCalendario.offset[0],
                draggeableElements.contenedorCronogramaNotas.offset[0],
            ];

            let mccw_addon_draggeable = { // This is the v2 object
                data: {
                    dateContainer: draggeableElements.monthYear,
                    timeContainer: draggeableElements.contenedorHora,
                    weatherContainer: draggeableElements.contenedorClima,
                    calendarContainer: draggeableElements.contenedorCalendario,
                    scheduleNotesContainer: draggeableElements.contenedorCronogramaNotas,
                },
                screen: {
                    width: screenSize[0],
                    height: screenSize[1]
                },
                position: Math.max(x_offsets) > 0 ? "custom" : "default", // If all x offsets are 0 it means this wallpaper was on default
                // Position will be helpful later on, this allows the wallpaper to tell what to do when refreshing!
            };

            localStorage.removeItem("draggeableElements");
            localStorage.setItem("mccw_addon_draggeable", JSON.stringify(mccw_addon_draggeable));
        };
    }

    if (Object.keys(MCCW.properties.draggeable.preset).length > 0){ // This means we have a preset and we need to preserve it
        let preset = MCCW.properties.draggeable.preset;
        let keys = Object.keys(preset);

        if (keys.includes("contenedorCalendario")){ // If we are on the v1, this key should pop up
            let mccw_addon_draggeable = { // This is the v2 object
                data: {
                    dateContainer: draggeableElements.monthYear,
                    timeContainer: draggeableElements.contenedorHora,
                    weatherContainer: draggeableElements.contenedorClima,
                    calendarContainer: draggeableElements.contenedorCalendario,
                    scheduleNotesContainer: draggeableElements.contenedorCronogramaNotas,
                },
                screen: {
                    width: screenSize[0],
                    height: screenSize[1]
                },
                position: "custom",
            };

            MCCW.properties.draggeable.preset = {...mccw_addon_draggeable.data}; // Old preset object doesn't have screen data or position

            localStorage.removeItem("draggeableElements");
            localStorage.setItem("mccw_addon_draggeable", JSON.stringify(mccw_addon_draggeable)); // We store the preset now converted into v2
        }
    }
}

function initiateDragEvents() {

    fallbackDragEvents(); // For old versions presets and private

    if (MCCW.properties.draggeable.active){

        MCCW.addons.draggeable.elements.icons.drag.id = "drag-icon";
        MCCW.addons.draggeable.elements.icons.rotate.id = "rotate-icon";
        MCCW.addons.draggeable.elements.icons.success.id = "success-icon";
        MCCW.addons.draggeable.elements.icons.clipboard.id = "clipboard-icon";

        addDraggeableIcon(MCCW.addons.draggeable.elements.icons.drag);
        addDraggeableIcon(MCCW.addons.draggeable.elements.icons.rotate);
        addDraggeableIcon(MCCW.addons.draggeable.elements.icons.success);
        addDraggeableIcon(MCCW.addons.draggeable.elements.icons.clipboard);

        MCCW.addons.draggeable.elements.icons.success.addEventListener("mouseup", mouseSuccessEvent);
        MCCW.addons.draggeable.elements.icons.clipboard.addEventListener("mouseup", mouseSuccessEvent);

        MCCW.addons.draggeable.elements.list = document.getElementsByClassName("draggeable"); // This returns the draggeable elements on code order!
        let draggeable = localStorage.getItem("mccw_addon_draggeable") ? JSON.parse(localStorage.getItem("mccw_addon_draggeable")) : {};

        if (draggeable?.data){
            MCCW.properties.draggeable.screen = draggeable.screen;

            MCCW.addons.draggeable.elements.data = draggeable.data;
            MCCW.addons.draggeable.elements.position = draggeable.position;

        };

        setElementsLocation();
    };
};

function refreshDragEvents(){
    setElementsLocation();
}

function setElementsLocation(){

    const list = MCCW.addons.draggeable.elements.list;
    const elements = MCCW.addons.draggeable.elements.data;

    function readLocation(){
        for (let i = 0; i < list.length; i++) {
            list[i].style.top  = elements[list[i].id].offset[1] + "px";
            list[i].style.left = elements[list[i].id].offset[0] + "px";
            list[i].style.transform = `rotate(${elements[list[i].id].rotationOffset[0]}deg)`;
            list[i].addEventListener("mousedown", mouseEventDown);
            list[i].addEventListener("mouseup", mouseIconUpEvent);
        };
    };

    function initialLocation(){
        let totalHeight = 0;
        for (let i = 0; i < list.length; i++) {
            if (elements[list[i].id] == undefined) {
                if (i == 0) { // First element
                    elements[list[i].id] = {
                        height: list[i].offsetHeight,
                        offset: [0, 0],
                        rotationOffset: [0, 0]
                    };
                } else {
                    totalHeight += list[i - 1].offsetHeight + MCCW.properties.draggeable.offset; // Add previous element height
                    elements[list[i].id] = {
                        height: list[i].offsetHeight,
                        offset: [0, totalHeight],
                        rotationOffset: [0, 0]
                    };
                }
                list[i].style.top  = elements[list[i].id].offset[1] + "px";
                list[i].style.left = elements[list[i].id].offset[0] + "px";
            }

            if (MCCW.properties.draggeable.active){
                list[i].addEventListener("mousedown", mouseEventDown);
                list[i].addEventListener("mouseup", mouseIconUpEvent);
            };
        }
    }


    if (MCCW.properties.draggeable.screen.width !== window.innerWidth) { // Changing the size of the screen means changing the offset, this will reset the location of the elements
        localStorage.removeItem("mccw_addon_draggeable");
        MCCW.addons.draggeable.elements.data = {};
        MCCW.addons.draggeable.elements.position = "default";
    };

    MCCW.properties.draggeable.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    MCCW.properties.draggeable.offset = window.innerHeight * MCCW.properties.draggeable.offset / 1080;

    setTimeout(function () {

        if (Object.keys(MCCW.properties.draggeable.preset).length > 0){

            MCCW.addons.draggeable.elements.position = "custom";

            let preset = MCCW.properties.draggeable.preset;
            for (let i = 0; i < list.length; i++) {
                list[i].style.top  = preset[list[i].id].offset[1] + "px";
                list[i].style.left = preset[list[i].id].offset[0] + "px";
                list[i].style.transform = `rotate(${preset[list[i].id].rotationOffset[0]}deg)`;
                if (MCCW.properties.draggeable.active){
                    list[i].removeEventListener("mousedown", mouseEventDown);
                    list[i].removeEventListener("mouseup", mouseIconUpEvent);
                }
            };

            MCCW.addons.draggeable.elements.data = preset;
        
        } else {

            if (localStorage.getItem("mccw_addon_draggeable")) {
                readLocation();
            } else {
                initialLocation();
                localStorage.setItem("mccw_addon_draggeable", JSON.stringify({
                    data: {...MCCW.addons.draggeable.elements.data},
                    screen: {...MCCW.properties.draggeable.screen},
                    position: "default",
                }));
            };

        };
    }, 1000);
}


function addDraggeableIcon(element) {
    let draggeableSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    draggeableSVG.setAttribute("height", "24px");
    draggeableSVG.setAttribute("width", "24px");
    draggeableSVG.setAttribute("viewbox", "0 0 24 24");

    let draggeablePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    switch (element.id) {
        case "drag-icon":
            draggeablePath.setAttribute("d", "M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z");
            break;
        case "rotate-icon":
            draggeablePath.setAttribute("d", "M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z");
            break;
        case "success-icon":
            draggeablePath.setAttribute("d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
            break;
        case "clipboard-icon":
            draggeablePath.setAttribute("d", "M15.5,2h-8C6.67,2,6,2.67,6,3.5v10C6,14.33,6.67,15,7.5,15h8c0.83,0,1.5-0.67,1.5-1.5v-10C17,2.67,16.33,2,15.5,2z M15.5,13.5h-8v-10h8V13.5z M3,12v-1.5h1.5V12H3z M3,15v-1.5h1.5V15H3z M9,16.5h1.5V18H9V16.5z M3,7.5h1.5V9H3V7.5z M7.5,18H6v-1.5 h1.5V18z M4.5,18C3.67,18,3,17.33,3,16.5h1.5V18z M4.5,6H3c0-0.83,0.67-1.5,1.5-1.5V6z M13.49,16.5c0,0.83-0.67,1.5-1.5,1.5h0v-1.5 L13.49,16.5L13.49,16.5z");
            break;
    }
    element.appendChild(draggeableSVG).appendChild(draggeablePath);
}

function mouseEventDown(e) {
    if (!MCCW.properties.draggeable.dragEvent.active) {
        MCCW.properties.draggeable.dragEvent.element = this.id;
        clearInterval(MCCW.properties.draggeable.dragEvent.interval);
        MCCW.properties.draggeable.dragEvent.interval = setInterval(function () {
            if (MCCW.properties.draggeable.dragEvent.timer < MCCW.properties.draggeable.dragEvent.timeEvent) {
                MCCW.properties.draggeable.dragEvent.timer++;
            } else {
                document.getElementById(MCCW.properties.draggeable.dragEvent.element).classList.add("dragging");
                document.getElementById(MCCW.properties.draggeable.dragEvent.element).appendChild(MCCW.addons.draggeable.elements.icons.drag);
                document.getElementById(MCCW.properties.draggeable.dragEvent.element).appendChild(MCCW.addons.draggeable.elements.icons.rotate);
                document.getElementById(MCCW.properties.draggeable.dragEvent.element).appendChild(MCCW.addons.draggeable.elements.icons.success);
                document.getElementById(MCCW.properties.draggeable.dragEvent.element).appendChild(MCCW.addons.draggeable.elements.icons.clipboard);
                MCCW.addons.draggeable.elements.icons.drag.addEventListener("mousedown", mouseDownIconsEvent);
                MCCW.addons.draggeable.elements.icons.rotate.addEventListener("mousedown", mouseDownIconsEvent);
                MCCW.addons.draggeable.elements.icons.success.addEventListener("mousedown", mouseDownIconsEvent);
                MCCW.addons.draggeable.elements.icons.clipboard.addEventListener("mousedown", mouseDownIconsEvent);
                MCCW.properties.draggeable.dragEvent.active = true;
                clearInterval(MCCW.properties.draggeable.dragEvent.interval);
            }
        }, 100);
    };
};

function mouseEventUp() {
    document.getElementById("clipboard-icon").style.backgroundColor = "";
    document.getElementById("clipboard-icon").children[0].style.fill = "";
    document.body.removeEventListener("mouseup", mouseEventUp);
}

function mouseIconUpEvent() {
    clearInterval(MCCW.properties.draggeable.dragEvent.interval);
    MCCW.properties.draggeable.dragEvent.timer = 0;
}

function mouseDownIconsEvent(e) {
    document.getElementById(this.id).style.backgroundColor = "var(--schemeColor)";
    document.getElementById(this.id).children[0].style.fill = "var(--font1)";
    switch (this.id) {
        case "drag-icon":
            MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].offset = [
                e.clientX - MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].offset[0],
                e.clientY - MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].offset[1]
            ]
            if (MCCW.properties.draggeable.dragEvent.activeIcon != this.id) {
                document.body.addEventListener("mousemove", mouseDragEvent);
                MCCW.properties.draggeable.dragEvent.activeIcon = this.id;
            } else {
                document.getElementById(this.id).style.backgroundColor = "";
                document.getElementById(this.id).children[0].style.fill = "";
                document.body.removeEventListener("mousemove", mouseDragEvent);
                MCCW.properties.draggeable.dragEvent.activeIcon = "";
            }
            break;

        case "rotate-icon":
            if (MCCW.properties.draggeable.dragEvent.activeIcon != this.id) {
                MCCW.properties.draggeable.dragEvent.rotateValue = document.getElementById(MCCW.properties.draggeable.dragEvent.element).style.transform;
                MCCW.properties.draggeable.dragEvent.rotateValue == "" ? MCCW.properties.draggeable.dragEvent.rotateValue = "rotate(0deg)" : false;
                MCCW.properties.draggeable.dragEvent.rotateValue = MCCW.properties.draggeable.dragEvent.rotateValue.slice(7, -4);
                MCCW.properties.draggeable.dragEvent.rotateValue = parseFloat(MCCW.properties.draggeable.dragEvent.rotateValue);
                MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].rotationOffset[0] = MCCW.properties.draggeable.dragEvent.rotateValue;
                MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].rotationOffset[1] = e.clientY;
                document.body.addEventListener("mousemove", mouseRotateEvent);
                document.body.addEventListener("mousedown", mouseRotateDownEvent, true);
                MCCW.properties.draggeable.dragEvent.activeIcon = this.id;
            } else {
                document.getElementById("rotate-icon").style.backgroundColor = "";
                document.getElementById("rotate-icon").children[0].style.fill = "";
                MCCW.properties.draggeable.dragEvent.activeIcon = "";
            }
            break;

        case "success-icon":
            document.getElementById(MCCW.properties.draggeable.dragEvent.element).removeEventListener("mousedown", mouseEventDown);
            if (localStorage.getItem("draggeableElements") != "") {
                localStorage.setItem("draggeableElements", JSON.stringify(MCCW.addons.draggeable.elements.data)); // Store all the data for the future
            }
            break;

        case "clipboard-icon":
            document.body.addEventListener("mouseup", mouseEventUp);
            break;
    }
}

function mouseSuccessEvent(e) {
    switch (this.id) {
        case "success-icon":
            clearInterval(MCCW.properties.draggeable.dragEvent.interval);
            MCCW.properties.draggeable.dragEvent.timer = 0;
            MCCW.properties.draggeable.dragEvent.active = false;
            document.getElementById(this.id).style.backgroundColor = "";
            document.getElementById(this.id).children[0].style.fill = "";
            document.getElementById("rotate-icon").remove();
            document.getElementById("drag-icon").remove();
            document.getElementById("success-icon").remove();
            document.getElementById("clipboard-icon").remove();
            document.getElementById(MCCW.properties.draggeable.dragEvent.element).addEventListener("mousedown", mouseEventDown);
            document.getElementById(MCCW.properties.draggeable.dragEvent.element).classList.remove("dragging");
            MCCW.properties.draggeable.dragEvent.element = "";
            break;
        case "clipboard-icon":
            document.getElementById("datosCronograma").value = JSON.stringify(MCCW.addons.draggeable.elements.data);
            var copyText = document.getElementById("datosCronograma");
            copyText.select();
            navigator.clipboard.writeText(copyText.value);

            document.getElementById("clipboard-icon").style.backgroundColor = "";
            document.getElementById("clipboard-icon").children[0].style.fill = "";

            break;
    }
}

function mouseDragEvent(e) {
    document.getElementById(MCCW.properties.draggeable.dragEvent.element).style.left = e.clientX - MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].offset[0] + "px";
    document.getElementById(MCCW.properties.draggeable.dragEvent.element).style.top = e.clientY - MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].offset[1] + "px";
}

function mouseRotateEvent(e) {
    MCCW.properties.draggeable.dragEvent.rotateValue = (e.clientY - MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].rotationOffset[1]) / 2 + MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].rotationOffset[0];
    document.getElementById(MCCW.properties.draggeable.dragEvent.element).style.transform = "rotate(" + MCCW.properties.draggeable.dragEvent.rotateValue + "deg)";
}

function mouseRotateDownEvent(e) {
    MCCW.addons.draggeable.elements.data[MCCW.properties.draggeable.dragEvent.element].rotationOffset[0] = MCCW.properties.draggeable.dragEvent.rotateValue;
    document.body.removeEventListener("mousemove", mouseRotateEvent);
    document.body.removeEventListener("mousedown", mouseRotateDownEvent, true);
    if (e.path[1].id != "rotate-icon") {
        document.getElementById("rotate-icon").style.backgroundColor = "";
        document.getElementById("rotate-icon").children[0].style.fill = "";
        MCCW.properties.draggeable.dragEvent.activeIcon = "";
    }
}