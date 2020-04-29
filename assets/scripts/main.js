$(document).ready(function () {
    //  Load a default date on start
    var dateOnLoad = moment('2018-01-01');

    //  Init template with HANDLEBARS
    var source = $('#template-calendar').html();
    var template = Handlebars.compile(source);

    //  jQuery nav
    var calendarApp = $('#calendar');
    var calendarMonth = $('.calendar__month');
    var calendarDays = $('.calendar__print-area');

    // Buttons
    var buttonNext = $('.next');
    var buttonPrevious = $('.previous')

    buttonNext.click(function() {
        dateOnLoad.add(1, 'M');
        // Clean the area
        calendarDays.html('');
        printMonth(dateOnLoad, template, calendarMonth, calendarDays);
        markHoliday(dateOnLoad); 
    });

    buttonPrevious.click(function() {
        dateOnLoad.subtract(1, 'M');
        // Clean the area
        calendarDays.html('');
        printMonth(dateOnLoad, template, calendarMonth, calendarDays);
        markHoliday(dateOnLoad); 
    });

    printMonth(dateOnLoad, template, calendarMonth, calendarDays);
    markHoliday(dateOnLoad);

});

/**************
 *  FUNCTIONS
 **************/

// Print all the daysInMonth of a DATE in a DESTINATION, toghether with a MONTHHEADER 
function printMonth(date, template, monthHeader, destination){
    //  Retrieve the days in a month
    var daysinMonth = date.daysInMonth();

    //  Retrieve the literal month and the year
    var monthAndYear = date.format('MMMM YYYY');

    monthHeader.text(monthAndYear);

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
            pointerDate : thisDate.format('YYYY-MM-DD')
        }

        //  Compile the template
        var output = template(dateTemplate);
        destination.append(output);
    }
};

function markHoliday(date){
    //  API Call
    var myApi = 'https://flynn.boolean.careers/exercises/api/holidays';
    $.ajax({
        type: "GET",
        url: myApi,
        data: {
            year : date.year(),
            month : date.month()
        },
        success: function (response) {
            var holidays = response.response;
            for (var i = 0; i < holidays.length; i++){
                var thisHoliday = holidays[i];
                var holidayCheck = $('.calendar__day[data-datePointer="' + thisHoliday.date + '"]');
                if (holidayCheck){
                    holidayCheck.addClass('holiday');
                }
            }
        },
        error: function(){
            console.log('Cannot connect to the API');
        }       
    });
};