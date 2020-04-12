import NotyAlertMessage from "../NotyAlertMessage";

$(document).ready(function() {
    let currentQuestionContentManagementPreview = document.querySelector('tvy-content-management-preview[data-for="currentQuestion"]');
    currentQuestionContentManagementPreview.contentType = 'question';
    currentQuestionContentManagementPreview.getManagementPreview();

    const loadedValueSubject = $('.subjectOfQuestion').dropdown('get value');
    if(loadedValueSubject !== '' || loadedValueSubject !== undefined) {
        const loadedValueTags = $('.tagsOfQuestion').dropdown('get value');
        let arrValueTags = [];
        if(loadedValueTags !== '' || loadedValueTags !== undefined) {
            arrValueTags = loadedValueTags.split(',');
        }
        loadDataForDropdownTags(loadedValueSubject, arrValueTags);
    }

    $('.subjectOfQuestion').dropdown({
        forceSelection: false,
        onChange: function(value){
            loadDataForDropdownTags(value);
        }
    });

    $('.tagsOfQuestion').dropdown({
        forceSelection: false
    });

    $('#formAskQuestion').submit(function(e) {
        let canSubmit = true;
        let valueSubject = $('.subjectOfQuestion').dropdown('get value');
        // let hasValueDesc = $('tvy-content-editor').attr('data-has-value');
        let descElements = $('.questionContentManagement .TVYContentOrder').children();
        if(descElements.length < 1) {
            new NotyAlertMessage(NotyAlertMessage.WARNING, 'Please add description for your question').show();
            canSubmit = false;
        }else {
            if(valueSubject === '') {
                new NotyAlertMessage(NotyAlertMessage.WARNING, 'Please choose a related subject').show();
                canSubmit = false;
            }
            else {
                let valueTags = $('.tagsOfQuestion').dropdown('get value');
                if(valueTags === '') {
                    new NotyAlertMessage(NotyAlertMessage.WARNING, 'Please choose at least one related tag').show();
                    canSubmit = false;
                }
            }
        }
        if(!canSubmit) {
            e.preventDefault();
        }
    });

    function loadDataForDropdownTags(subjectPublicId, selectedTags = []) {
        let url = window.location.origin + '/tag/get_tags_of_subject/' + subjectPublicId;
        $.ajax({
            url: url,
            type: 'GET',
            success: function(result) {
                let tags = result;
                $('.tagsOfQuestion .menu').html('');
                $('.tagsOfQuestion').dropdown('clear');
                if(tags.length > 0){
                    tags.forEach(function(ele){
                        let html = '<div class="item" data-value="'+ ele.public_id +'">';
                        html += '<img class="ui mini avatar image" src="' + ele.img_url + '">';
                        html += '<span class="menuSubjectName">' + ele.name_en + '</span>';
                        html += '<span class="menuNewLine"><br><br></span>';
                        html += '<span class="menuSubjectDesc">';
                        html += '<a href="https://www.google.com/" target="_blank"><i class="fas fa-info-circle"></i></a>&nbsp;';
                        html += ele.desc_en;
                        html += '</span>';
                        html += '</div>';
                        $('.tagsOfQuestion .menu').append(html);
                    });
                }

                selectedTags.forEach(tag => {
                    setTimeout(() => {
                        $('.tagsOfQuestion').dropdown('set selected', tag)
                    }, 0);
                })
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
});
