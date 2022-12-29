export const add = (t, setTime, objKey, timeObj, setArray) => {
    let time = t;
    if (time.includes("am")) {
        // if there's AM in the time
        if (time.split(":")[0] === "11") {
            // if the next hour will turn time into PM
            time = "12:00pm";
        } else {
            // if the next hour won't turn time into PM
            if (Number(time.split(":")[0]) < 11) {
                // if number doesn't exceed 12
                let number = Number(time.split(":")[0]);
                let added = number + 1;
                time = ('0' + added).slice(-2) + ":00am";
            } else {
                // if number exceeds 12
                time = "01:00am"
            }
        }
    } else {
        // if there's PM in the time
        if (time.split(":")[0] === "11") {
            // if the next hour will turn time into AM
            time = "12:00am";
        } else {
            // if the next hour won't turn time into AM
            if (Number(time.split(":")[0]) < 11) {
                // if number doesn't exceed 12
                let number = Number(time.split(":")[0]);
                let added = number + 1;
                time = ('0' + added).slice(-2) + ":00pm";
            } else {
                // if number exceeds 12
                time = "01:00pm"
            }
        }
    }
    setTime((prev) => ({ ...prev, [objKey]: time }));
};


export const preventTimeOverlap = (obj, arra) => {
    let values = Object.values(obj); // changing object values into array
    if (values.every(i => i.includes("am"))) {
        // if array is containing all am times
        


    } else if (values.every(i => i.includes("pm"))) {
        // if array is containing all pm times


    } else {
        // if  array is containing distinct times
        if (values[0].slice(5) === "am" && values[0].slice(5) === "pm") {
            // if array is containing am/pm in this order
        } else {

        }
    }
}


