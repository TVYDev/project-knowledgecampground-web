$(document).ready(function (){
    // Display if button of the nav menu is selected
    let btnNavMenu = document.querySelectorAll('#KCNavbar .btnNavMenu');
    btnNavMenu.forEach(btn => {
        if(btn.getAttribute('data-url') === window.location.href) {
            btn.classList.add('active');
        }else {
            btn.classList.remove('active');
        }
    });

    // Button change language on the navbar
    $('.btnLang').popup({
        inline     : true,
        hoverable  : true,
        position   : 'bottom center',
        transition : 'vertical flip'
    });
    $('#KCNavbar .languageList div').click(function(e){
        let lang = $('html').attr('lang');
        let currentLang = 'en';
        if(lang === 'en'){
            currentLang = 'kh';
        }
        changeLangOfProgram(currentLang);
    });

    // Button user profile after login
    $('.blockAvatarImg').popup({
        inline     : true,
        hoverable  : true,
        position   : 'bottom center',
        transition : 'vertical flip'
    });

    $('#KCNavbar .btnLogin, #KCNavbar .btnAsk, #KCNavbar .btnQuestions').click(function () {
        window.location.href = $(this).attr('data-url');
    });

    $('#KCNavbar .menuBtns li').click(function(e){
        window.location.href = $(this).attr('data-url');
    });

    $('#KCNavbar .txtSearch').keypress(function(e){
        if(e.keyCode === 13) {
            let value = $(this).val();
            let max = 2048;
            if(value.length > max) {
                value = value.substring(0, max);
            }
            window.location.href = $(this).attr('data-url') + '?search=' + value;
        }
    });

    $('#KCNavbar #sideMenu .selLanguages​').change(function(){
        changeLangOfProgram($(this).val());
    });

    navigateSideMenuForMobileScreen();
});

// ---------Helper functions
function changeLangOfProgram (lang) {
    window.location.href = '/locale/' + lang;
}

function navigateSideMenuForMobileScreen() {
    $('#KCNavbar #btnSideMenu').click(function() {
        let bodyWidth = $('body').width();
        let navLogoWidth = $('#KCNavbar #navLogo').width();
        let widthToSlide = bodyWidth - navLogoWidth - 12;
        if($(this).attr('data-side-menu') == 'closed'){
            $('#mainContent').css('display', 'none');
            $('#KCNavbar').css('marginLeft', widthToSlide + 'px');
            $('#sideMenu').css('width', (widthToSlide + 1) + 'px');
            $('#sideMenu').css('padding', '20px');
            $('#btnSideMenu').removeClass('fa-bars').addClass('fa-times');
            $(this).attr('data-side-menu','opened');
        }else{
            $('#mainContent').css('display', 'block');
            $('#KCNavbar').css('marginLeft', 0);
            $('#sideMenu').css('width', 0);
            $('#sideMenu').css('padding', 0);
            $('#btnSideMenu').removeClass('fa-times').addClass('fa-bars');
            $(this).attr('data-side-menu','closed');
        }
    });
}
