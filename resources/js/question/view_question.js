import NotyAlertMessage from "../NotyAlertMessage";

$(document).ready(function() {
    console.log('here', );
    let url = window.location.origin + '/question/get-info/JghFacmZTp';

    $.ajax({
        url: url,
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'GET',
        success: (result) => {
            console.log(result);
        },
        error: function(err) {
            console.log('error', err);
        }
    });

    let tvyContentActionView = document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');
    // tvyContentActionView.items = 123;
    // console.log('view', tvyContentActionView.items);
    // tvyContentActionView.render();

    $('#formAnswerQuestion').submit(function(e) {
        let canSubmit = true;
        let hasValueDesc = $('tvy-content-editor').attr('data-has-value');
        let descElements = $('.answerContentManagement .TVYContentOrder').children();
        if(hasValueDesc !== 'true' || descElements.length < 1) {
            new NotyAlertMessage(NotyAlertMessage.WARNING, 'Please add description for your answer').show();
            canSubmit = false;
        }
        if(!canSubmit) {
            e.preventDefault();
        }
    });
});
