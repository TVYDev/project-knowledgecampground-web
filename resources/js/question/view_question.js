import NotyAlertMessage from "../NotyAlertMessage";

$(document).ready(function() {
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
