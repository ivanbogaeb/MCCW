window.onload = async () => {

    let { properties, functions, widgets, date } = MCCW; // MCCW is declared in it's own file

    if (!MCCW.bootup){
        functions.bootup();
        setInterval(timeController, 1000);
    };

    function timeController(){
        let current_date = new Date();
        if (!date.time.length){
            date.initial = current_date;
            date.setup();
            widgets.date.draw();
            widgets.clock.draw();
            widgets.calendar.draw();
            widgets.calendar.fill();
        } else {
            if (date.time[1] != current_date.getMinutes()){
                date.time[1] = current_date.getMinutes();
                widgets.clock.draw();
                if (MCCW.properties.weather.active.all){
                   if (MCCW.properties.weather.active.current){
                       MCCW.widgets.weather.current();
                   }
                   if (MCCW.properties.weather.active.forecast){
                       MCCW.widgets.weather.forecast();
                   }
                }
                if (date.time[2] != current_date.getDate()){
                    date.initial = current_date;
                    date.setup();
                    widgets.date.draw();
                    widgets.calendar.draw();
                    widgets.calendar.fill();
                };
            };
        }
    };
};