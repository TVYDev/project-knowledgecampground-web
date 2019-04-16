$(document).ready(function () {
    let descElementArray = $('.descElement').toArray();
    $.each(descElementArray, function (index, value) {
        let thisElement = $(this);
        let totalElement = thisElement.attr('data-total-element');
        let position = thisElement.attr('data-position');
        if(position == 1){
            thisElement.children('.descTools').children('.toolArrowUp').addClass('inactive');
        }
        else if(position == totalElement) {
            thisElement.children('.descTools').children('.toolArrowDown').addClass('inactive');
        }
    });
});