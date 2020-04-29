$(document).ready(function () {
    //  Load a default date on start
    var dateOnLoad = moment('2018-01-01');

    //  Init template with HANDLEBARS
    var source = $('#template-calendar').html();
    var template = Handlebars.compile(source);

    var calendarApp = $('#calendar');
    var calendarMonth = $('.calendar__month');

    printMonth(dateOnLoad, calendarMonth, template, calendarApp);

});

/**************
 *  FUNCTIONS
 **************/

function printMonth(date, month, template, destination){
    //  Retrieve the days in a month
    var daysinMonth = date.daysInMonth();

    //  Retrieve the literal month and the year
    var monthAndYear = date.format('MMMM YYYY');

    month.text(monthAndYear);

    //  Print the dates
    for (var i = 1; i <= daysinMonth; i++){
        var thisDate = moment({
            year : date.year(),
            month : date.month(),
            day : i
        });

        //  Set the template
        var dateTemplate = {
            thisDate : thisDate.format('DD'),
            thisName : thisDate.format('ddd'),
        }

        //  Compile the template
        var output = template(dateTemplate);
        destination.append(output);

    }

};
