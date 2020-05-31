import NotyAlertMessage from "../NotyAlertMessage";

$(document).ready(function() {
    const userPublicId = document.querySelector('.pageViewQuestion input[name="userPublicId"]').value;

    // Fill ContentActionView for current question
    const questionPublicId = document.querySelector('.pageViewQuestion input[name="questionPublicId"]').value;
    let currentQuestionContentActionView = document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');
    getInfoForQuestionContentActionView(currentQuestionContentActionView, questionPublicId);

    // Fill ContentActionView for each answer
    let allAnswerContentActionViews = document.querySelectorAll('tvy-content-action-view[data-for="answer"]');
    allAnswerContentActionViews.forEach(answerContentActionView => {
        const answerPublicId = answerContentActionView.getAttribute('data-public-id');
        getInfoForAnswerContentActionView(answerContentActionView, answerPublicId);
    });

    // ContentManagementPreview for answer
    let currentQuestionContentManagementPreview = document.querySelector('tvy-content-management-preview[data-for="currentAnswer"]');
    currentQuestionContentManagementPreview.contentType = 'answer';
    currentQuestionContentManagementPreview.getManagementPreview();

    function getInfoForQuestionContentActionView (contentActonView, publicId) {
        getInfoForContentActionView(contentActonView, publicId, 'question');
    }

    function getInfoForAnswerContentActionView (contentActionView, publicId) {
        getInfoForContentActionView(contentActionView, publicId, 'answer');
    }

    function getInfoForContentActionView (contentActionView, publicId, type) {
        let url = window.location.origin + `/${type}/get-info/` + publicId;
        if(userPublicId) {
            url += `?viewer=${userPublicId}`;
        }

        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: (result) => {
                if(result.success === true) {
                    const { owner_avatar_url, author_name, author_id, readable_time, description, relativePathStoreImages, comments, vote, vote_by_viewer } = result.data;
                    if(type === 'question') {
                        const { is_favorite_by_viewer, summary_info } = result.data;
                        const { num_views, last_active_date } = summary_info;
                        setUIStateBtnFavoriteQuestion(is_favorite_by_viewer);
                        setSummaryInfoOFQuestion(num_views, last_active_date);
                    }
                    contentActionView.vote = vote;
                    contentActionView.voteByViewer = vote_by_viewer;
                    contentActionView.contentType = type;
                    contentActionView.ownerAvatarUrl = owner_avatar_url;
                    contentActionView.authorName = author_name;
                    contentActionView.authorId = author_id;
                    contentActionView.readableTime = readable_time;
                    contentActionView.description = JSON.parse(description);
                    contentActionView.relativePathStoreImages = relativePathStoreImages;
                    contentActionView.comments = comments;
                    contentActionView.getViewContent();
                }
            },
            error: function(err) {
                console.log(`Error getting content of ${type} [${questionPublicId}]`, err);
            }
        });
    }

    const search = window.location.search;
    const regexSearch = /top=(\w+)&?/;
    const result = search.match(regexSearch);
    if(result) {
        $('html, body').animate({ scrollTop: $(`#${result[1]}`).offset().top - 30 }, 500);
    }

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

    // Summary Info of question
    function setSummaryInfoOFQuestion(numViews, lastActive) {
        const summaryInfo = $('.questionSummaryInfo');
        summaryInfo.find('.numViews').text(numViews);
        summaryInfo.find('.lastActive').text(lastActive);
    }

    // Favorite question
    $('.questionFavorite').click(function() {
        let isFavorite = $(this).hasClass('selected');
        manageFavoriteQuestion(questionPublicId, !isFavorite);
    });

    function setUIStateBtnFavoriteQuestion (isFavorite) {
        let btnFavoriteQuestion = $('.questionFavorite');
        if(isFavorite) {
            btnFavoriteQuestion.addClass('selected fas');
            btnFavoriteQuestion.removeClass('far');
        }else{
            btnFavoriteQuestion.removeClass('selected fas');
            btnFavoriteQuestion.addClass('far');
        }

        let title = btnFavoriteQuestion.hasClass('selected') ? 'Unmark as favorite' : 'Mark as favorite';
        btnFavoriteQuestion.attr('title', title);
    }

    function manageFavoriteQuestion (questionPublicId, isFavorite) {
        let url = window.location.origin + '/activity/manage-favorite-question';

        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'POST',
            data: {
                'question_public_id': questionPublicId,
                'is_favorite': isFavorite
            },
            success: (result) => {
                if(result.success === true) {
                    setUIStateBtnFavoriteQuestion(isFavorite);
                }
                else {
                    console.log(`Failed to manage favorite question`, result);
                }
            },
            error: function(err) {
                console.log(`Error getting content of ${type} [${questionPublicId}]`, err);
            }
        });
    }
});
