import NotyAlertMessage from "../NotyAlertMessage";

$(document).ready(function() {
    const questionPublicId = document.querySelector('.pageViewQuestion input[name="questionPublicId"]').value;
    let url = window.location.origin + '/question/get-info/' + questionPublicId;

    $.ajax({
        url: url,
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'GET',
        success: (result) => {
            if(result.success === true) {
                const { question_avatar_url, author_name, author_id, readable_time } = result.data;
                let currentQuestionContentActionView = document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');
                currentQuestionContentActionView.ownerAvatarUrl = question_avatar_url;
                currentQuestionContentActionView.authorName = author_name;
                currentQuestionContentActionView.authorId = author_id;
                currentQuestionContentActionView.readableTime = readable_time;
                currentQuestionContentActionView.getViewContent();
                console.log(currentQuestionContentActionView.ownerAvatarUrl);
            }
        },
        error: function(err) {
            console.log('error', err);
        }
    });


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
