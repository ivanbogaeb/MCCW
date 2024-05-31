var backgroundProperties = function (properties, root, setColor){
    // Background Image
    if (properties.backgroundimage){
        if (properties.backgroundimage.value){
            if (properties.backgroundimage.value !== "undefined" || properties.backgroundimage.value !== undefined || properties.backgroundimage.value !== ""){
                Object.assign(fondo.style, {
                    width: window.innerWidth+"px",
                    height: window.innerHeight+"px",
                    background: "url("+"file:///"+properties.backgroundimage.value+")"
                }); 
            }
        } else {
            Object.assign(fondo.style, {background: ""});
        }
    }
    // Background size
    if (properties.backgroundalignment){
        if (properties.backgroundalignment.value){
            if (properties.backgroundalignment.value == 0){
                Object.assign(fondo.style, {backgroundSize: "contain"});
            } else {
                Object.assign(fondo.style, {backgroundSize: "cover"});
            }
            Object.assign(fondo.style, {
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            });
        }
    }
    // Background Blur
    if (properties.backgroundblur){
        root.style.setProperty("--filterBg", properties.backgroundblur.value+"px");
    }
};