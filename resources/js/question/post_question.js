$(document).ready(function() {
    // window.addEventListener("dragover",function(e){
    //     e.preventDefault();
    // });
    // window.addEventListener("drop",function(e){
    //     e.preventDefault();
    // });
    $('.subjectOfQuestion').dropdown({
        forceSelection: false,
        onChange: function(value){
            let subjectPublicId = value;
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
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });
    $('.tagsOfQuestion').dropdown({
        forceSelection: false
    });
});
