window.MCCW = {
    bootup: false,
    variables: {
        month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        weekday: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    },
    date: {
        time: [], /* time[0] -> Hour || time[1] -> Minutes || time[2] -> Date || time[3] -> Year */
        hour12: true,
        initial: new Date(),
        setup: () => {
            MCCW.date.time = [MCCW.date.initial.getHours(), MCCW.date.initial.getMinutes(), MCCW.date.initial.getDate(), MCCW.date.initial.getFullYear()];
        },
    },
    widgets: {
        date: date_widget,
        notes: notes_widget,
        clock: clock_widget,
        media: media_widget,
        weather: weather_widget,
        calendar: calendar_widget,
        schedule: schedule_widget,
        visualizer: visualizer_widget,
    },
    addons: {
        font: font_addon,
        parallax: parallax_addon,
    },
    helpers: {
        setColor: () => {},
    },
    functions : {
        bootup: async () => {
            if (!MCCW.bootup){
                MCCW.addons.parallax.start();
                MCCW.widgets.media.start();
                MCCW.widgets.visualizer.start();
                MCCW.addons.font.load();
                MCCW.widgets.schedule.draw();
                MCCW.widgets.notes.draw();
            };
        },
    },
    properties: wallpaper_properties,
}