$(document).ready(function () {
    /*
    *   Print the calendar
    */

    //  Load a default date on start
    var dateOnLoad = moment('2018-01-01');

    // Init template with HANDLEBARS
    var source = $('#template-calendar');
    var template = Handlebars.compile(source);

});