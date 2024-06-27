window.wallpaperPropertyListener = {
    applyUserProperties: function(properties){

        if (properties.display_message){
            if (properties.display_message.value){
                alerts("[MCCW] - Minimal Customizable Character Wallpaper",
                `
                <a>v2.0.3 EOS (End of Service) is out!</a>
                <br>
                <a>Disclaimer:</a>
                <ul>
                    <li>If your wallpaper broke with this update, just edit your preset again instead of complaining and harassing the devs, it takes 5 minutes, mature please.</li>
                </ul>
                <a>Patch Notes (20-06-2024):</a>
                <ul>
                    <li>Notes and schedule are working now.</li>
                    <li>Remember to make a backup of your notes and schedule files, otherwise they will be lost every patch.</li>
                </ul>
                <a>To disable this message permanently:</a>
                <ul>
                    <li>First option under the "♥ Information" section of the properties called "Display Popup", uncheck it.</li>
                </ul>
                `)
            }
        }

        if (properties.weather_api_key){
            if (properties.weather_api_key.value){
                MCCW.properties.weather.api_key = properties.weather_api_key.value;
            }
        }
        if (properties.weather_api_location){
            if (properties.weather_api_location.value){
                MCCW.properties.weather.location = properties.weather_api_location.value;
            }
        }
        if (properties.weather){
            if (MCCW.properties.weather.active.all !== properties.weather.value){
                if (MCCW.properties.weather.active.current){
                    MCCW.widgets.weather.current();
                }
                if (MCCW.properties.weather.active.forecast){
                    MCCW.widgets.weather.forecast();
                }
            }
            MCCW.properties.weather.active.all = properties.weather.value;
        }
        if (properties.weather_current){
            MCCW.properties.weather.active.current = properties.weather_current.value;
        }
        if (properties.weather_forecast){
            MCCW.properties.weather.active.forecast = properties.weather_forecast.value;
        }
        if (properties.weather_temperature){
            if (properties.weather_temperature.value !== MCCW.properties.weather.convention){
                if (MCCW.properties.weather.active.all){
                    if (MCCW.properties.weather.active.current){
                        MCCW.widgets.weather.current();
                    }
                    if (MCCW.properties.weather.active.forecast){
                        MCCW.widgets.weather.forecast();
                    }
                }
            }
            if (properties.weather_temperature.value === "Metric"){
                MCCW.properties.weather.convention = "metric";
            } else {
                MCCW.properties.weather.convention = "imperial";
            }
        }

        /*
            WIDGETS & TEXT
        */

        if (properties.accentColor1){ // Accent / Scheme
            if (properties.accentColor1.value){
                setCSSRootVariable("--schemeColor", WEColorToRGB(properties.accentColor1.value));
            }
        }
        if (properties.textColor1){ // Primary Text
            if (properties.textColor1.value){
                setCSSRootVariable("--font1", WEColorToRGB(properties.textColor1.value));
            }
        }
        if (properties.textColor2){ // Secondary Text
            if (properties.textColor2.value){
                setCSSRootVariable("--font2", WEColorToRGB(properties.textColor2.value));
            }
        }
        if (properties.sidebarbackgroundcolor){ // Side Bar Background Color
            if (properties.sidebarbackgroundcolor.value){
                let color = splitRGB(properties.sidebarbackgroundcolor.value);
                setCSSRootVariable("--sidebgColor", `rgba(${color[0]}, ${color[1]}, ${color[2]}, var(--sidebgOpacity))`);
            }
        }
        if (properties.sidebarbackgroundopacity){ // Side Bar Background Opacity
            setCSSRootVariable("--sidebgOpacity", properties.sidebarbackgroundopacity.value);
        }
        if (properties.sidebarbackgroundblur){ // Side Bar Background Blur
            setCSSRootVariable("--sidebgFilter", `blur(${properties.sidebarbackgroundblur.value}px)`);
        }
        if (properties.sidebarbordercolor){ // Side Bar Border Color
            if (properties.sidebarbordercolor.value){
                setCSSRootVariable("--sideBorderColor", WEColorToRGB(properties.sidebarbordercolor.value));
            }
        }
        if (properties.sidebarborderwidth){ // Side Bar Border Color
            setCSSRootVariable("--sideBorderWidth", `${properties.sidebarborderwidth.value}px`);
        }
        if (properties.sidebarborderradius){ // Side Bar Border Color
            setCSSRootVariable("--sideBorderRadius", `${properties.sidebarborderradius.value}px`);
        }
        if (properties.displaydate){
            if (properties.displaydate.value){
                setCSSRootVariable("--dateDisplay", "block");
            } else {
                setCSSRootVariable("--dateDisplay", "none");
            }
        }
        if (properties.widget_date_x_pos){
            setCSSRootVariable("--dateLeft", `${properties.widget_date_x_pos.value}%`);
        }
        if (properties.widget_date_y_pos){
            setCSSRootVariable("--dateBottom", `${properties.widget_date_y_pos.value}%`);
        }
        if (properties.widget_date_rotation){
            setCSSRootVariable("--dateRotation", `${properties.widget_date_rotation.value}deg`);
        }
        if (properties.displayCalendar){
            if (properties.displayCalendar.value){
                setCSSRootVariable("--calendarDisplay", "block");
            } else {
                setCSSRootVariable("--calendarDisplay", "none");
            }
        }
        if (properties.widget_calendar_x_pos){
            setCSSRootVariable("--calendarLeft", `${properties.widget_calendar_x_pos.value}%`);
        }
        if (properties.widget_calendar_y_pos){
            setCSSRootVariable("--calendarBottom", `${properties.widget_calendar_y_pos.value}%`);
        }
        if (properties.widget_calendar_rotation){
            setCSSRootVariable("--calendarRotation", `${properties.widget_calendar_rotation.value}deg`);
        }
        if (properties.displayClock){
            if (properties.displayClock.value){
                setCSSRootVariable("--timeDisplay", "block");
            } else {
                setCSSRootVariable("--timeDisplay", "none");
            }
        }
        if (properties._24hsformat){
            if (properties._24hsformat.value){
                MCCW.date.hour12 = false;
                MCCW.widgets.clock.draw();
            } else {
                MCCW.date.hour12 = true;
                MCCW.widgets.clock.draw();
            }
        }
        if (properties.widget_time_x_pos){
            setCSSRootVariable("--timeLeft", `${properties.widget_time_x_pos.value}%`);
        }
        if (properties.widget_time_y_pos){
            setCSSRootVariable("--timeBottom", `${properties.widget_time_y_pos.value}%`);
        }
        if (properties.widget_time_rotation){
            setCSSRootVariable("--timeRotation", `${properties.widget_time_rotation.value}deg`);
        }
        if (properties.displayweather){
            if (properties.displayweather.value){
                setCSSRootVariable("--weatherDisplay", "block");
            } else {
                setCSSRootVariable("--weatherDisplay", "none");
            }
        }
        if (properties.widget_weather_x_pos){
            setCSSRootVariable("--weatherLeft", `${properties.widget_weather_x_pos.value}%`);
        }
        if (properties.widget_weather_y_pos){
            setCSSRootVariable("--weatherBottom", `${properties.widget_weather_y_pos.value}%`);
        }
        if (properties.widget_weather_rotation){
            setCSSRootVariable("--weatherRotation", `${properties.widget_weather_rotation.value}deg`);
        }
        if (properties.displaySchedule){
            if (properties.displaySchedule.value){
                setCSSRootVariable("--scheduleDisplay", "table");
                setCSSRootVariable("--scheduleActive", "1");
            } else {
                setCSSRootVariable("--scheduleDisplay", "none");
                setCSSRootVariable("--scheduleActive", "0");
            }
        }
        if (properties.widget_schedule_x_pos){
            setCSSRootVariable("--scheduleLeft", `${properties.widget_schedule_x_pos.value}%`);
        }
        if (properties.widget_schedule_y_pos){
            setCSSRootVariable("--scheduleBottom", `${properties.widget_schedule_y_pos.value}%`);
        }
        if (properties.widget_schedule_rotation){
            setCSSRootVariable("--scheduleRotation", `${properties.widget_schedule_rotation.value}deg`);
        }
        if (properties.displayNotes){
            if (properties.displayNotes.value){
                setCSSRootVariable("--notesDisplay", "block");
                setCSSRootVariable("--notesActive", "1");
            } else {
                setCSSRootVariable("--notesDisplay", "none");
                setCSSRootVariable("--notesActive", "0");
            }
        }


       
        /*
            PARALLAX & BACKGROUND
        */
        if (properties.backgroundColor){ // Background Color
            if (properties.backgroundColor.value){
                setCSSRootVariable("--bgColor", WEColorToRGB(properties.backgroundColor.value));
            }
        }
        if (properties.backgroundimage){
            if (properties.backgroundimage.value){
                setCSSRootVariable("--bgImage", `url('file:///${properties.backgroundimage.value}')`);
            } else {
                setCSSRootVariable("--bgImage", ``);
            }
        }
        if (properties.backgroundalignment){
            if (properties.backgroundalignment.value == 0){
                setCSSRootVariable("--bgSize", "contain");
            } else {
                setCSSRootVariable("--bgSize", "cover");
            }
        }
        if (properties.backgroundblur){
            setCSSRootVariable("--bgFilter", `${properties.backgroundblur.value}px`);
        }
        if (properties.parallax_layer_1_color){ // Parallax Layer 1
            if (properties.parallax_layer_1_color.value){
                setCSSRootVariable("--parallaxBg1Margin", "100vw");
                setCSSRootVariable("--parallaxColor1", `drop-shadow(-100vw 0px ${WEColorToRGB(properties.parallax_layer_1_color.value)})`);
            }
        }
        if (properties.parallax_layer_2_color){ // Parallax Layer 2
            if (properties.parallax_layer_2_color.value){
                setCSSRootVariable("--parallaxBg2Margin", "100vw");
                setCSSRootVariable("--parallaxColor2", `drop-shadow(-100vw 0px ${WEColorToRGB(properties.parallax_layer_2_color.value)})`);
            }
        }
        if (properties.parallax_layer_3_color){ // Parallax Layer 3
            if (properties.parallax_layer_3_color.value){
                setCSSRootVariable("--parallaxBg3Margin", "100vw");
                setCSSRootVariable("--parallaxColor3", `drop-shadow(-100vw 0px ${WEColorToRGB(properties.parallax_layer_3_color.value)})`);
            }
        }
        if (properties.tiltedBarColor){
            if (properties.tiltedBarColor.value){

                let mainColor = splitRGB(properties.tiltedBarColor.value);
                let secondary = mainColor.map((value) => {
                    return value - 25;
                });
                let tertiary = mainColor.map((value) => {
                    return value - 50;
                });

                setCSSRootVariable("--parallaxBg1Margin", "100vw");
                setCSSRootVariable("--parallaxBg2Margin", "100vw");
                setCSSRootVariable("--parallaxBg3Margin", "100vw");
                setCSSRootVariable("--parallaxColor1", `drop-shadow(-100vw 0px rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`);
                setCSSRootVariable("--parallaxColor2", `drop-shadow(-100vw 0px rgb(${secondary[0]}, ${secondary[1]}, ${secondary[2]})`);
                setCSSRootVariable("--parallaxColor3", `drop-shadow(-100vw 0px rgb(${tertiary[0]}, ${tertiary[1]}, ${tertiary[2]})`);
            }
        }
        if (properties.parallax_layer_1_opacity){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg1Opacity", properties.parallax_layer_1_opacity.value);
        }
        if (properties.parallax_layer_2_opacity){ // Parallax Layer 2
            setCSSRootVariable("--parallaxBg2Opacity", properties.parallax_layer_2_opacity.value);
        }
        if (properties.parallax_layer_3_opacity){ // Parallax Layer 3
            setCSSRootVariable("--parallaxBg3Opacity", properties.parallax_layer_3_opacity.value);
        }
        if (properties.parallax_layer_1_image){ // Parallax Layer 1
            if (properties.parallax_layer_1_image.value){
                setCSSRootVariable("--parallaxBg1Margin", "0px");
                setCSSRootVariable("--parallaxColor1", ``);
                setCSSRootVariable("--parallaxBg1ImageSize", "auto");
                setCSSRootVariable("--parallaxBg1Left", "0");
                setCSSRootVariable("--parallaxBg1Bottom", "0");
                setCSSRootVariable("--parallaxBg1", `url('file:///${properties.parallax_layer_1_image.value}')`);
            } else {
                setCSSRootVariable("--parallaxBg1", ``);
                setCSSRootVariable("--parallaxBg1Left", "");
                setCSSRootVariable("--parallaxBg1Bottom", "");
                setCSSRootVariable("--parallaxBg1ImageSize", "100%");
            }
        }
        if (properties.parallax_layer_2_image){ // Parallax Layer 2
            if (properties.parallax_layer_2_image.value){
                setCSSRootVariable("--parallaxBg2Margin", "0px");
                setCSSRootVariable("--parallaxColor2", ``);
                setCSSRootVariable("--parallaxBg2ImageSize", "auto");
                setCSSRootVariable("--parallaxBg2Left", "0");
                setCSSRootVariable("--parallaxBg2Bottom", "0");
                setCSSRootVariable("--parallaxBg2", `url('file:///${properties.parallax_layer_2_image.value}')`);
            } else {
                setCSSRootVariable("--parallaxBg2", ``);
                setCSSRootVariable("--parallaxBg2Left", "");
                setCSSRootVariable("--parallaxBg2Bottom", "");
                setCSSRootVariable("--parallaxBg2ImageSize", "100%");
            }
        }
        if (properties.parallax_layer_3_image){ // Parallax Layer 3
            if (properties.parallax_layer_3_image.value){
                setCSSRootVariable("--parallaxBg3Margin", "0px");
                setCSSRootVariable("--parallaxColor3", ``);
                setCSSRootVariable("--parallaxBg3ImageSize", "auto");
                setCSSRootVariable("--parallaxBg3Left", "0");
                setCSSRootVariable("--parallaxBg3Bottom", "0");
                setCSSRootVariable("--parallaxBg3", `url('file:///${properties.parallax_layer_3_image.value}')`);
            } else {
                setCSSRootVariable("--parallaxBg3", ``);
                setCSSRootVariable("--parallaxBg3Left", "");
                setCSSRootVariable("--parallaxBg3Bottom", "");
                setCSSRootVariable("--parallaxBg3ImageSize", "100%");
            }
        }
        if (properties.parallax_layer_1_x){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg1Left", `${properties.parallax_layer_1_x.value}%`);
        }
        if (properties.parallax_layer_1_y){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg1Bottom", `${properties.parallax_layer_1_y.value}%`);
        }
        if (properties.parallax_layer_2_x){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg2Left", `${properties.parallax_layer_2_x.value}%`);
        }
        if (properties.parallax_layer_2_y){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg2Bottom", `${properties.parallax_layer_2_y.value}%`);
        }
        if (properties.parallax_layer_3_x){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg3Left", `${properties.parallax_layer_3_x.value}%`);
        }
        if (properties.parallax_layer_3_y){ // Parallax Layer 1
            setCSSRootVariable("--parallaxBg3Bottom", `${properties.parallax_layer_3_y.value}%`);
        }
        if (properties.media_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("media").setAttribute("data-depth", properties.media_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.widgets_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("sidebar").setAttribute("data-depth", properties.widgets_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.character_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("character").setAttribute("data-depth", properties.character_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.visualizer_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("visualizer").setAttribute("data-depth", properties.visualizer_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.shadow_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("shadow").setAttribute("data-depth", properties.shadow_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.background_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("background").setAttribute("data-depth", properties.background_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.layer_1_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("background_parallax_layer_1").setAttribute("data-depth", properties.layer_1_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.layer_2_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("background_parallax_layer_2").setAttribute("data-depth", properties.layer_2_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.layer_3_parallax_depth){
            MCCW.addons.parallax.finish();
            document.getElementById("background_parallax_layer_3").setAttribute("data-depth", properties.layer_3_parallax_depth.value); 
            MCCW.addons.parallax.start();
        }
        if (properties.media_depth){
            setCSSRootVariable("--mediaDepth", `${properties.media_depth.value}`);
        }
        if (properties.widgets_depth){
            setCSSRootVariable("--widgetsDepth", `${properties.widgets_depth.value}`);
        }
        if (properties.character_depth){
            setCSSRootVariable("--characterDepth", `${properties.character_depth.value}`);
        }
        if (properties.visualizer_depth){
            setCSSRootVariable("--visualizerDepth", `${properties.visualizer_depth.value}`);
        }
        if (properties.background_depth){
            setCSSRootVariable("--backgroundDepth", `${properties.background_depth.value}`);
        }
        if (properties.layer_1_depth){
            setCSSRootVariable("--parallax1Depth", `${properties.layer_1_depth.value}`);
        }
        if (properties.layer_2_depth){
            setCSSRootVariable("--parallax2Depth", `${properties.layer_2_depth.value}`);
        }
        if (properties.layer_3_depth){
            setCSSRootVariable("--parallax3Depth", `${properties.layer_3_depth.value}`);
        }


        /*
            CHARACTER
        */
        if (properties.waifuSelector){
            if (properties.waifuSelector.value){
                setCSSRootVariable("--charImage", `url('file:///${properties.waifuSelector.value}')`);
            } else {
                setCSSRootVariable("--charImage", ``);
            }
        }
        if (properties.waifusize){
            if (properties.waifusize.value){
                setCSSRootVariable("--charSize", properties.waifusize.value);
            }
        }
        if (properties.waifuInvert){
            if (properties.waifuInvert.value){
                setCSSRootVariable("--charInvert", `scaleX(-1)`);
            } else {
                setCSSRootVariable("--charInvert", `scaleX(1)`);
            }
        }
        if (properties.waifuX){
            setCSSRootVariable("--charLeft", `${properties.waifuX.value}%`);
        }
        if (properties.waifuY){
            setCSSRootVariable("--charBottom", `${properties.waifuY.value}%`);
        }
        if (properties.waifuShadowColor){
            if (properties.waifuShadowColor.value){
                let color = splitRGB(properties.waifuShadowColor.value);
                setCSSRootVariable("--charShadowColor", `rgba(${color[0]}, ${color[1]}, ${color[2]}, var(--charShadowOpacity))`);
            }
        }
        if (properties.waifushadowopacity){
            setCSSRootVariable("--charShadowOpacity", properties.waifushadowopacity.value);
        }
        if (properties.displayshadow){
            if (properties.displayshadow.value){
                setCSSRootVariable("--charShadowDisplay", `block`);
            } else {
                setCSSRootVariable("--charShadowDisplay", `none`);
            }
        }
        if (properties.shadowx){
            setCSSRootVariable("--charShadowLeft", `${properties.shadowx.value}%`);
        }
        if (properties.shadowy){
            setCSSRootVariable("--charShadowBottom", `${properties.shadowy.value}%`);
        }


        /*
            MEDIA & VISUALIZER
        */
        if (properties.display_vis){
            if (properties.display_vis.value){
                MCCW.properties.visualizer.active = true;
                setCSSRootVariable("--visualizerDisplay", "flex");
            } else {
                setCSSRootVariable("--visualizerDisplay", "none");
                MCCW.properties.visualizer.active = false;
            }
        }
        if (properties.display_media){
            if (properties.display_media.value){
                setCSSRootVariable("--mediaDisplay", "block");
                MCCW.widgets.media.redraw();
            } else {
                setCSSRootVariable("--mediaDisplay", "none");
                MCCW.widgets.media.clean();
            }
        }
        if (properties.visColor){
            if (properties.visColor.value){
                MCCW.properties.visualizer.color = WEColorToRGB(properties.visColor.value);
                MCCW.widgets.media.properties.color = MCCW.properties.visualizer.color;
                MCCW.widgets.media.elements.ctx.fillStyle = MCCW.widgets.media.properties.color;
                MCCW.widgets.visualizer.elements.ctx.fillStyle = MCCW.properties.visualizer.color;
                startMediaWidget();
            }
        }
        if (properties.audiovisualizershadowcolor){
            if (properties.audiovisualizershadowcolor.value){
                MCCW.properties.visualizer.shadow = WEColorToRGB(properties.audiovisualizershadowcolor.value);
                MCCW.widgets.media.properties.shadow.color = MCCW.properties.visualizer.shadow;
                MCCW.widgets.media.elements.ctx.shadowColor = MCCW.widgets.media.properties.shadow.color;
                MCCW.widgets.visualizer.elements.ctx.shadowColor = MCCW.properties.visualizer.shadow;
                startMediaWidget();
            }
        }
        if (properties.audiovisualizershadowblur){
            MCCW.properties.visualizer.shadowBlur = properties.audiovisualizershadowblur.value;
            MCCW.properties.media.shadow.blur = properties.audiovisualizershadowblur.value;
            MCCW.widgets.media.elements.ctx.shadowBlur = properties.audiovisualizershadowblur.value;
            MCCW.widgets.visualizer.elements.ctx.shadowBlur = properties.audiovisualizershadowblur.value;
            startMediaWidget();
        }
        if (properties.audiobarsamount){
            MCCW.properties.visualizer.channels = properties.audiobarsamount.value;
        }
        if (properties.maxheight){
            MCCW.properties.visualizer.height = properties.maxheight.value;
        }
        if (properties.audiobarswidth){
            MCCW.properties.visualizer.width = properties.audiobarswidth.value;
        }
        if (properties.audiobarsspread){
            MCCW.properties.visualizer.spacing = properties.audiobarsspread.value;
        }
        if (properties.audiovisualizermovex){
            setCSSRootVariable("--visualizerX", `${properties.audiovisualizermovex.value}%`);
        }
        if (properties.audiovisualizermovey){
            setCSSRootVariable("--visualizerY", `${properties.audiovisualizermovey.value}%`);
        }
        if (properties.audiovisualizerrotation){
            setCSSRootVariable("--visualizerRotation", `rotate(${properties.audiovisualizerrotation.value}deg)  scaleY(-1)`);
        }
        if (properties.spotifycanvasmovex){
            setCSSRootVariable("--mediaX", `${properties.spotifycanvasmovex.value}%`);
        }
        if (properties.spotifycanvasmovey){
            setCSSRootVariable("--mediaY", `${properties.spotifycanvasmovey.value}%`);
        }
        if (properties.spotifycanvasrotation){
            setCSSRootVariable("--mediaRotation", `rotate(${properties.spotifycanvasrotation.value}deg)`);
        }
    }
}