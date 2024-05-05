export function getReadableDate(dateString) {
    // Parse the date string
    var date = new Date(dateString);

    // Define arrays for days and months
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get the day, month, and year components from the date object
    var dayOfWeek = days[date.getDay()];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    // Concatenate the components into a single string
    var dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;

    return dateString;
}