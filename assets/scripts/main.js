$(document).ready(function () {
    //  Load a default date on start
    var dateOnLoad = moment('2018-01-01');

    //  Init template with HANDLEBARS
    var source = $('#template-calendar').html();
    var template = Handlebars.compile(source);

    //  jQuery nav
    var calendarMonth = $('.calendar__month');
    var calendarDays = $('.calendar__print-area');

    // Buttons
    var buttonNext = $('.next');
    var buttonPrevious = $('.previous')


    buttonNext.click(function() {
        dateOnLoad.add(1, 'M');
        if (dateOnLoad.isAfter(moment('2018-12-01'))){
            alert('Sorry, cannot go past that'); 
            dateOnLoad = moment('2018-12-01');
        }
        else {
            showCompleteCalendar(dateOnLoad, template, calendarMonth, calendarDays);         
        }
    });

    buttonPrevious.click(function() {
        dateOnLoad.subtract(1, 'M');
        if (dateOnLoad.isBefore(moment('2018-01-01'))){
            alert('Sorry, cannot go behind that'); 
            dateOnLoad = moment('2018-01-01');
        }
        else {
            showCompleteCalendar(dateOnLoad, template, calendarMonth, calendarDays);       
        }
    });

    showCompleteCalendar(dateOnLoad, template, calendarMonth, calendarDays);

    $('#calendar').on('mouseenter', '.calendar__day', function(){
        $(this).children('span.calendar__day__holiday').show();
    });

    $('#calendar').on('mouseleave', '.calendar__day', function(){
        $(this).children('span.calendar__day__holiday').hide(); 
    });

    /*
    $('.calendar__day').mouseover(function () { 
        $(this).children('span.calendar__day__holiday').show(); 
    });*/
/*
    $('.calendar__day').mouseout(function () { 
        $(this).children('span.calendar__day__holiday').hide(); 
    });*/
});

/**************
 *  FUNCTIONS
 **************/

// Consolidate all functions in one
function showCompleteCalendar(dateOnLoad, template, calendarMonth, calendarDays){
    calendarDays.html('');
    printMonth(dateOnLoad, template, calendarMonth, calendarDays);
    markHoliday(dateOnLoad);
};

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
            pointerDate : thisDate.format('YYYY-MM-DD'),
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
                    $('.calendar__day__holiday[data-datePointer="' + thisHoliday.date + '"]').append(holidays[i].name);
                }
            }
        },
        error: function(){
            console.log('Cannot connect to the API');
        }       
    });
};