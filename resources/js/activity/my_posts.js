$(document).ready(function() {
    $('.myPostsContent .btnEdit').click(function() {
        window.location.href = $(this).data('href');
    });
});
