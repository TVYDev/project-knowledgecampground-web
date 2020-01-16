$(document).ready(function () {
    // $('body').css('backgroundColor', '#d2ffe1');
    $('.loginContent .kcCard .frontCard .btnGoToRegister').click(moveCardToRegister);
    $('.loginContent .kcCard .backCard .btnGoToLogin').click(moveCardToLogin);
});

function moveCardToRegister () {
    $('.loginContent .formSide .kcCard .backCard').css('transform', 'rotateY(0deg)');
    $('.loginContent .formSide .kcCard .frontCard').css('transform', 'rotateY(-180deg)');
}

function moveCardToLogin () {
    $('.loginContent .formSide .kcCard .backCard').css('transform', 'rotateY(180deg)');
    $('.loginContent .formSide .kcCard .frontCard').css('transform', 'rotateY(0deg)');
}
