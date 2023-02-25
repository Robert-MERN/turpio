export const getTitle = (event) => {

    let title = "";

    switch (event.eventType) {
        case "one-on-one":
            title = event.eventName
            break;
        case "hotel-reservation":
            title = event.nameOfRooms
            break;
        case "sport-fields":
            title = event.typeOfFields
            break;
        case "team-booking":
            title = event.serviceName
            break;
    }
    return title;
}


export const getTime = (event) => {
    let time = "";
    switch (event.eventDurationUnit) {
        case "day":
            time = (event.eventDuration / 60) / 24;
            break;
        case "hrs":
            time = event.eventDuration / 60
            break;
        case "min":
            time = event.eventDuration
            break;
    }
    return `${time}  ${event.eventDurationUnit}`;
}