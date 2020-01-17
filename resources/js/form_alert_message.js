import NotyAlertMessage from "./NotyAlertMessage";

$(document).ready(function() {
    const divError = $('.kcAlertMessages');
    const hasError = divError.attr('data-has-error');
    const errorRegister = divError.attr('data-error-register');
    const hasInfo = divError.attr('data-has-info');

    if(hasError == 'true'){
        if(errorRegister == 'true'){
            $('.loginContent .formSide .kcCard .backCard').css('transform', 'rotateY(0deg)');
            $('.loginContent .formSide .kcCard .frontCard').css('transform', 'rotateY(-180deg)');
        }

        let errorMsg = '';
        const listErrors = document.querySelectorAll('.kcAlertMessages ul li');
        for(let i=0; i<listErrors.length; i++){
            errorMsg += '🚩 ' + listErrors[i].textContent + '<br>';
        }
        new NotyAlertMessage(NotyAlertMessage.ERROR, errorMsg).show();
    }else if(hasError == 'false') {
        const msg = document.querySelector('.kcAlertMessages ul li');
        let msgContent = '😃 ' + msg.textContent;

        if(hasInfo == 'false')
        {
            new NotyAlertMessage(NotyAlertMessage.SUCCESS, msgContent).show();
        }
        else
        {
            new NotyAlertMessage(NotyAlertMessage.INFO, msgContent).show();
        }
    }
});
