var media_widget = {
    start: startMediaWidget,
    redraw: drawMediaWidgetCanvas,
    clean: cleanMediaWidget,
    elements: {
        canvas: Element,
        ctx: Element
    },
    sizes: {
        thumbnail: {
            width: 120,
            height: 120,
        },
        text: {
            leftPadding: 20,
            status: 0,
            title: 0,
            artist: 0,
        },
        total: {
            width: 0,
            height: 0,
        },
    },
    properties: {
        active: true,
        status: 0,
        song: {
            title: "",
            artist: "",
            subTitle: "",
            albumTitle: "",
            albumArtist: "",
            genres: "",
            contentType: "",
            thumbnail: "",
        },
        shadow: {
            color: "#262625",
            blur: 2
        },
        color: "#ff0000",
        position: {
            x: 460,
            y: 840
        },
        scale: 1
    },
};

function startMediaWidget() {
    drawMediaWidget();
    window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);
    window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);
    window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
};

function cleanMediaWidget(){
    ctx.clearRect(-10, -10, media_widget.sizes.total.width, media_widget.sizes.total.height); // We use -10, -10 to also clean the shadow of the thumbnail
}

function drawMediaWidget(){
    media_widget.elements.canvas = document.getElementById("media_canvas");
    media_widget.elements.ctx = document.getElementById("media_canvas").getContext("2d");

    media_widget.elements.canvas.setAttribute('width', window.innerWidth);
    media_widget.elements.canvas.setAttribute('height', window.innerHeight);
    /*
        You must keep in mind that this wallpaper uses 1080p as base to be drawn,
        this means that everything we draw must be based from the down, right corner
        to keep the maximum distance as 1920px, height is "irrelevant" because it will
        be always based on a few pixels from bottom.
    */
    let positionX = Math.round((38 * window.innerWidth)/100); // 38% to the left
    let positionY = Math.round((76 * window.innerHeight)/100); // 76% to the bottom

    media_widget.elements.ctx.translate(positionX, positionY);
    if (window.innerHeight < window.innerWidth){ // Vertical screens check
        MCCW.properties.media.scale = window.innerHeight/1080;
        media_widget.elements.ctx.scale(MCCW.properties.media.scale , MCCW.properties.media.scale);
    }
}

async function drawMediaWidgetCanvas(){

    if (MCCW.properties.media.active){
        // Remember, this starts to get drawn based on the CTX.transalte used in "drawMediaWidget"
        const ctx = document.getElementById("media_canvas").getContext("2d");
        ctx.shadowBlur = MCCW.properties.media.shadow.blur;
        ctx.fillStyle = MCCW.widgets.media.properties.color;
        ctx.shadowColor = MCCW.widgets.media.properties.shadow.color;
    
        await ctx.clearRect(-10, -10, media_widget.sizes.total.width, media_widget.sizes.total.height); // We use -10, -10 to also clean the shadow of the thumbnail
    
        let image = new Image();
        image.src = MCCW.properties.media.song.thumbnail;
    
        image.onload = async () => {
            
            // Scaling every image to 120x120, making it fit inside the square
            let scale_factor = Math.min(120 / image.width, 120 / image.height);
            let newWidth = image.width * scale_factor;
            let newHeight = image.height * scale_factor;
            let x = (120 / 2) - (newWidth / 2);
            let y = (120/ 2) - (newHeight / 2);
    
            media_widget.elements.ctx.fillStyle = "#000"; // Thumbnail background
    
            ctx.fillRect(0, 0, 120, 120);
    
            media_widget.elements.ctx.fillStyle = MCCW.widgets.media.properties.color;
            ctx.drawImage(image, x, y, newWidth, newHeight);
    
            if (MCCW.properties.media.status === 1){
                ctx.font = `21px ${MCCW.properties.font.name}`;
                media_widget.sizes.text.status = ctx.measureText("NOW PLAYING").width;
                ctx.fillText("NOW PLAYING", 140, 31);
            } else if (MCCW.properties.media.status === 2){
                ctx.font = `21px ${MCCW.properties.font.name}`;
                media_widget.sizes.text.status = ctx.measureText("PAUSED").width;
                ctx.fillText("PAUSED", 140, 31);
            };
    
            ctx.font = `34px ${MCCW.properties.font.name}`;
            media_widget.sizes.text.title = ctx.measureText(MCCW.properties.media.song.title.toUpperCase()).width;
            ctx.fillText(MCCW.properties.media.song.title.toUpperCase(), 140, 69);
            ctx.font = `30px ${MCCW.properties.font.name}`;
            media_widget.sizes.text.artist = ctx.measureText(MCCW.properties.media.song.artist).width;
            ctx.fillText(MCCW.properties.media.song.artist, 140, 103);
    
            /*
                High performance sorcery, with each song change we update the widget size property,
                this way we clean ONLY the space we use, rather than cleaning the whole canvas which is very demanding!
                This same thing is applied to the audio visualizer, performance wise really helps on that scenario, here it's just
                a cool feature that doesn't make a significant different except on very low end devices.
            */
    
            media_widget.sizes.total = {
                width: media_widget.sizes.thumbnail.width + media_widget.sizes.text.leftPadding + Math.max(media_widget.sizes.text.artist, media_widget.sizes.text.status, media_widget.sizes.text.title) + 10,
                height: media_widget.sizes.thumbnail.height + 10,
            }
    
        };
    };
};

// Playback status
async function wallpaperMediaPlaybackListener(event) {
    if (MCCW.properties.media.active){
        MCCW.properties.media.status = event.state;
        if (event.state > 0 && event.state < 3){
            drawMediaWidgetCanvas();
        } else {
            media_widget.elements.ctx.fillStyle = "#000"; // Thumbnail background
            await  media_widget.elements.ctx.clearRect(-10, -10, media_widget.sizes.total.width + 10, media_widget.sizes.total.height + 10);
        }
    }
};

// Playback data
function wallpaperMediaPropertiesListener(event) {
    if (MCCW.properties.media.active){
        MCCW.properties.media.song.title = event.title;
        MCCW.properties.media.song.artist = event.artist;
        MCCW.properties.media.song.albumTitle = event.albumTitle;
        MCCW.properties.media.song.contentType = event.contentType;
        if (MCCW.properties.media.status > 0 && MCCW.properties.media.status < 3){
            drawMediaWidgetCanvas();
        }
    }
};

// Thumbnail
async function wallpaperMediaThumbnailListener(event) {
    if (MCCW.properties.media.active){
        MCCW.properties.media.song.thumbnail = event.thumbnail;
        if (MCCW.properties.media.status > 0 && MCCW.properties.media.status < 3){
            drawMediaWidgetCanvas();
        }
    }
};
