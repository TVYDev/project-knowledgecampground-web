$(document).ready(function() {
    const divError = $('.kcAlertMessages');
    const hasError = divError.attr('data-has-error');
    const errorRegister = divError.attr('data-error-register');
    const hasInfo = divError.attr('data-has-info');

    if(hasError == 'true'){
        if(errorRegister == 'true'){
            $('.loginContent .formSide .kcCard .frontCard').css('visibility', 'hidden');
            $('.loginContent .formSide .kcCard .backCard').css('visibility', 'visible');
            $('.loginContent .formSide .kcCard').css('transform', 'rotateY(180deg)');
        }

        let errorMsg = '';
        const listErrors = document.querySelectorAll('.kcAlertMessages ul li');
        for(let i=0; i<listErrors.length; i++){
            errorMsg += '🚩 ' + listErrors[i].textContent + '<br>';
        }
        new Noty({
            type: 'error',
            theme: 'nest',
            layout: 'topRight',
            text: errorMsg,
            timeout: '6000',
            progressBar: true,
            closeWith: ['click'],
            animation: {
                open: 'animated flipInY', // Animate.css class names
                close: 'animated flipOutY' // Animate.css class names
            }
        }).show();
    }else if(hasError == 'false') {
        const msg = document.querySelector('.kcAlertMessages ul li');
        let msgContent = '😃 ' + msg.textContent;

        if(hasInfo == 'false')
        {
            new Noty({
                type: 'success',
                theme: 'nest',
                layout: 'topRight',
                text: msgContent,
                timeout: '6000',
                progressBar: true,
                closeWith: ['click'],
                animation: {
                    open: 'animated flipInY', // Animate.css class names
                    close: 'animated flipOutY' // Animate.css class names
                }
            }).show();
        }
        else
        {
            new Noty({
                type: 'info',
                theme: 'nest',
                layout: 'topRight',
                text: msgContent,
                timeout: '6000',
                progressBar: true,
                closeWith: ['click'],
                animation: {
                    open: 'animated flipInY', // Animate.css class names
                    close: 'animated flipOutY' // Animate.css class names
                }
            }).show();
        }
    }
});