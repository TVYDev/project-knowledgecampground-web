$(document).ready(function() {
    $('.userProfileContent .btnEditProfile').click(function(e) {
        window.location.href = $(this).attr('data-url');
    });
});
