const alerta = {
    crear: (fecha, titulo, comentario) => {
        let pantalla = document.createElement("div");
        pantalla.classList.add("alertas");
        let contenedor = document.createElement("div");
        contenedor.classList.add("contenedorAlerta");
        let cerrar = document.createElement("a");
        cerrar.classList.add("cerrarAlerta");
        cerrar.onclick = function () {
            var parent = this.offsetParent;
            parent.style.display = "none";
            setTimeout(function () {
                (document.getElementsByTagName("body"))[0].removeChild(parent);
            }, 200);
        }
        cerrar.appendChild(document.createTextNode("X"));
        let fecha_contenedor = document.createElement("a");
        fecha_contenedor.classList.add("fechaAlerta");
        fecha_contenedor.appendChild(document.createTextNode(fecha));
        let titulo_contenedor = document.createElement("a");
        titulo_contenedor.classList.add("tituloAlerta");
        titulo_contenedor.appendChild(document.createTextNode(titulo));
        let comentario_contenedor = document.createElement("a");
        comentario_contenedor.classList.add("comentarioAlerta");
        comentario_contenedor.innerHTML = comentario;
        contenedor.appendChild(cerrar);
        contenedor.appendChild(fecha_contenedor);
        contenedor.appendChild(titulo_contenedor);
        contenedor.appendChild(comentario_contenedor);
        pantalla.appendChild(contenedor);
        (document.getElementsByTagName("body"))[0].appendChild(pantalla);
    },
    schedule: () => {
        alerta.crear("Notification:", "", "Schedule and notes copied to clipboard! Now you can disable thisfunction in the wallpaper settings menu.")
    },
    scheduleClean: () => {
        alerta.crear("Notification:", "", "Schedule memory wiped, reload your wallpaper.")
    },
    clima: (error) => {
        alerta.crear("Weather Error:", "", error)
    },
    spotify: (error) => {
        alerta.crear("Spotify Error:", "", error)
    },
    actualizacion: (fecha, titulo, comentario) => {
        alerta.crear(fecha, titulo, comentario);
    },
}