var alerts = (title, error) => {
    let screen = document.createElement("div");
    screen.classList.add("alerts");

    let container = document.createElement("div");
    container.classList.add("alerts_container");

    let close = document.createElement("a");
    close.classList.add("close_alert");
    close.onclick = function (){
        var parent = this.offsetParent;
        parent.style.display = "none";
        setTimeout(function (){
            (document.getElementsByTagName("body"))[0].removeChild(parent);
        }, 200);
    }
    close.appendChild(document.createTextNode("X"));

    let title_container = document.createElement("a");
    title_container.classList.add("title_alert");
    title_container.appendChild(document.createTextNode(title));

    let error_container = document.createElement("a");
    error_container.classList.add("error_alert");
    error_container.innerHTML = error;

    container.appendChild(close);
    container.appendChild(title_container);
    container.appendChild(error_container);

    screen.appendChild(container);
    (document.getElementsByTagName("body"))[0].appendChild(screen);
}