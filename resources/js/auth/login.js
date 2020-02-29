$(document).ready(function () {
    $('.loginContent .kcCard .frontCard .btnGoToRegister').click(moveCardToRegister);
    $('.loginContent .kcCard .backCard .btnGoToLogin').click(moveCardToLogin);

    $('.btnGoogle, .btnFacebook').click(function() {
        window.location.href = $(this).data('url');
    });
});

function moveCardToRegister () {
    $('.loginContent .formSide .kcCard .backCard').css('transform', 'rotateY(0deg)');
    $('.loginContent .formSide .kcCard .frontCard').css('transform', 'rotateY(-180deg)');
}

function moveCardToLogin () {
    $('.loginContent .formSide .kcCard .backCard').css('transform', 'rotateY(180deg)');
    $('.loginContent .formSide .kcCard .frontCard').css('transform', 'rotateY(0deg)');
}
