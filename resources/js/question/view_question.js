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
                const { question_avatar_url, author_name, author_id, readable_time, description, relativePathStoreImages, comments } = result.data;
                let currentQuestionContentActionView = document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');
                currentQuestionContentActionView.contentType = currentQuestionContentActionView.QUESTION_CONTENT_TYPE;
                currentQuestionContentActionView.ownerAvatarUrl = question_avatar_url;
                currentQuestionContentActionView.authorName = author_name;
                currentQuestionContentActionView.authorId = author_id;
                currentQuestionContentActionView.readableTime = readable_time;
                currentQuestionContentActionView.description = JSON.parse(description);
                currentQuestionContentActionView.relativePathStoreImages = relativePathStoreImages;
                currentQuestionContentActionView.comments = comments;
                currentQuestionContentActionView.getViewContent();
            }
        },
        error: function(err) {
            console.log(`Error getting content of question [${questionPublicId}]`, err);
        }
    });

    let allAnswerContentActionViews = document.querySelectorAll('tvy-content-action-view[data-for="answer"]');
    allAnswerContentActionViews.forEach(answerContentActionView => {
        const answerPublicId = answerContentActionView.getAttribute('data-public-id');
        let url = window.location.origin + '/answer/get-info/' + answerPublicId;
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: (result) => {
                if(result.success === true) {
                    const { question_avatar_url, author_name, author_id, readable_time, description, relativePathStoreImages, comments } = result.data;
                    answerContentActionView.contentType = answerContentActionView.QUESTION_CONTENT_TYPE;
                    answerContentActionView.ownerAvatarUrl = question_avatar_url;
                    answerContentActionView.authorName = author_name;
                    answerContentActionView.authorId = author_id;
                    answerContentActionView.readableTime = readable_time;
                    answerContentActionView.description = JSON.parse(description);
                    answerContentActionView.relativePathStoreImages = relativePathStoreImages;
                    answerContentActionView.comments = comments;
                    answerContentActionView.getViewContent();
                }
            },
            error: function(err) {
                console.log(`Error getting content of answer [${answerPublicId}]` , err);
            }
        });
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
