const Days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    // Saturday: 5,
    // Sunday: 6,
}
const  getDayString = (day) => {
    switch (day) {
        case Days.Monday:
            return "Monday";
        case Days.Tuesday:
            return "Tuesday";
        case Days.Wednesday:
            return "Wednesday";
        case Days.Thursday:
            return "Thursday";
        case Days.Friday:
            return "Friday";
        case Days.Saturday:
            return "Saturday";
        case Days.Sunday:
            return "Sunday";
        default:
            return "Invalid day";
    }
};


export {
    Days, 
    getDayString,
};