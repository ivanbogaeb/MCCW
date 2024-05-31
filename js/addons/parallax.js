function startParallax(){
    MCCW.addons.parallax.properties.scene = document.getElementById('parallax');
    MCCW.addons.parallax.properties.instance = new Parallax(MCCW.addons.parallax.properties.scene);
    MCCW.addons.parallax.properties.character = document.getElementById('character');
    MCCW.addons.parallax.properties.characterInstance = new Parallax(MCCW.addons.parallax.properties.character);
};

function finishParallax(){
    MCCW.addons.parallax.properties.instance.destroy();
};

var parallax_addon = {
    start: startParallax,
    finish: finishParallax,
    properties: {
        scene: Element,
        instance: "",
        character: Element,
        characterInstance: ""
    }
}