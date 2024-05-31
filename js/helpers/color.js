function WEColorToRGB(color){
    color = color.split(' ');
    color = color.map(function(c) {
        return Math.ceil(c * 255);
    });
    return `rgb(${color})`;
}

function rgbToHex(rgb){
    let hexArray = (rgb).split(" ").map((primary) => {
        let hex = Math.ceil(primary * 255).toString(16).length;
        return hex.length == 1 ? "0" + hex : hex;
    });
    return `#${hexArray[0]}${hexArray[1]}${hexArray[2]}`;
};

function splitRGB(rgb){
    return rgb.split(" ").map(function (color){
        return Math.ceil(color * 255);
    });
};

function setCSSRootVariable(cssRootVariable, value){
    const root = document.querySelector(':root');
    root.style.setProperty(cssRootVariable, value);
};

async function setColor(cssRootVariable, colorData, isCanvas, paintWaifu, isSideBar, opacity){
    const root = document.querySelector(':root');
    if (isCanvas){
        let rgb = data.split(" ").map(function (color){
            return Math.ceil(color * 255);
        });
        try {
            cssRootVariable.canvas.id == "audio_canvas" ? audio_ctx.shadowColor = "#"+componentToHex(rgb[0])+componentToHex(rgb[1])+componentToHex(rgb[2]) : false;
        }catch(err){}
        paintWaifu ? await displayWaifuShadow(rgb[0],rgb[1],rgb[2]) : cssRootVariable.fillStyle = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);     
    } else {
        let customColor = data.split(" ");
        customColor = customColor.map(function(c){
            return Math.ceil(c * 255);
        });
        let cssData = "rgb(";
        if (opacity >= 0){ cssData += customColor + ", "+opacity+")";
        } else { cssData += customColor+")";}
        if (isSideBar){
            root.style.setProperty(cssRootVariable, cssData)
        } else {
            root.style.setProperty(cssRootVariable, cssData);
        }
    }
}

function componentToHex(c){
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}