$(document).ready(function () {
    $('.loginContent .kcCard .frontCard .btnGoToRegister').click(moveCardToRegister);
    $('.loginContent .kcCard .backCard .btnGoToLogin').click(moveCardToLogin);
});

function moveCardToRegister () {
    $('.loginContent .formSide .kcCard .frontCard').css('visibility', 'hidden');
    $('.loginContent .formSide .kcCard .backCard').css('visibility', 'visible');
    $('.loginContent .formSide .kcCard').css('transform', 'rotateY(180deg)');
}

function moveCardToLogin () {
    $('.loginContent .formSide .kcCard .backCard').css('visibility', 'hidden');
    $('.loginContent .formSide .kcCard .frontCard').css('visibility', 'visible');
    $('.loginContent .formSide .kcCard').css('transform', 'rotateY(0deg)');
}
