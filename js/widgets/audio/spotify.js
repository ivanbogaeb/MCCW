var spotify_widget = {
    draw: drawWidgetSpotify,
    elements: {
        canvas: Element,
        ctx: Element
    },
    properties: {
        active: true,
        shadow: {
            color: "#262625",
            blur: 2
        },
        text: {
            color: "#ff0000"
        },
        position: {
            x: 460,
            y: 840
        }
    },
    temp: {
        status: false,
    }
}

async function controlWidgetSpotify(){
    let playback = await MCCW.steroid.spotify.playback();
    /*
        Steroid's module for playback, play and pause are independent.
        This means that you have to implement your own custom "triggers" for redraw.

        In this example, redraw is only triggered when the song changes or when it's play status does.

        It could be implemented inside Steroid's moudle, but I prefer to keep things as "vanilla" as possible.
    */

    console.log(playback);

    if (playback?.songChanged || MCCW.widgets.spotify.temp.status !== playback?.play){
        if (playback?.name){
            const ctx = document.getElementById("spotify_canvas").getContext("2d");
            await ctx.clearRect(-30, -30, 1920, 230);
            let image = new Image();
            image.src = playback.cover.base64;
            image.onload = async () => {
                ctx.drawImage(image, 0, 0, 120, 120);
                if (playback?.play){
                    ctx.font = `21px ${MCCW.properties.font.name}`;
                    ctx.fillText("NOW PLAYING", 140, 31);
                    MCCW.widgets.spotify.temp.status = true;
                } else {
                    ctx.font = `21px ${MCCW.properties.font.name}`;
                    ctx.fillText("PAUSED", 140, 31);
                    MCCW.widgets.spotify.temp.status = false;
                };
                ctx.font = `34px ${MCCW.properties.font.name}`;
                ctx.fillText(playback.name.toUpperCase(), 140, 69);
                ctx.font = `30px ${MCCW.properties.font.name}`;
                ctx.fillText(playback.artist, 140, 103);
    
                MCCW.widgets.spotify.temp.songName = playback?.name;
            };
        }
    };
    //if (playback?.duration){};
    //if (playback?.progress){};
    if (playback?.stop){
        MCCW.widgets.spotify.temp.status = false;
        const ctx = document.getElementById("spotify_canvas").getContext("2d");
        await ctx.clearRect(-30, -30, 1920, 230)
    };
    //if (playback?.error){/*Do something!*/};
}

async function drawWidgetSpotify(){
    
    spotify_widget.elements.canvas = document.getElementById("spotify_canvas");
    spotify_widget.elements.ctx = document.getElementById("spotify_canvas").getContext("2d");

    spotify_widget.elements.ctx.shadowBlur = MCCW.properties.spotify.shadow.blur;
    spotify_widget.elements.ctx.fillStyle = MCCW.widgets.spotify.properties.text.color;
    spotify_widget.elements.ctx.shadowColor = MCCW.widgets.spotify.properties.shadow.color;
    spotify_widget.elements.ctx.translate(MCCW.widgets.spotify.properties.position.x, MCCW.widgets.spotify.properties.position.y);

    if (MCCW.properties.spotify.active){
        MCCW.steroid.spotify.settings.interval = 1000;
        MCCW.steroid.spotify.settings.progress = false;
        MCCW.steroid.spotify.settings.process_timestamp = false;

        var spotify_interval = setInterval(controlWidgetSpotify, MCCW.steroid.spotify.settings.interval);
    } else {
        clearInterval(spotify_interval);
    };

};