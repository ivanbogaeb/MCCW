var colorProperties = (properties, setColor, sideBarColor, sideBarOpacity, audioColor, componentToHex, spotify_ctx, audio_ctx, firstLoad, shadowColor) => {
    // Background Color
    if (properties.backgroundColor){
        if (properties.backgroundColor.value){
            setColor("--bgColor", properties.backgroundColor.value);
        }
    }
    // Accent Color
    if (properties.accentColor1){
        if (properties.accentColor1.value){
            setColor("--schemeColor", properties.accentColor1.value);
        }
    }
    // Primary Text
    if (properties.textColor1){
        if (properties.textColor1.value){
            setColor("--font1", properties.textColor1.value);
        }
    }
    // Secondary Text
    if (properties.textColor2){
        if (properties.textColor2.value){
            setColor("--font2", properties.textColor2.value);
        }
    }
    // Side Bar Border Color
    if (properties.sidebarbordercolor){
        setColor("--sideBorderColor", properties.sidebarbordercolor.value);
    }
};