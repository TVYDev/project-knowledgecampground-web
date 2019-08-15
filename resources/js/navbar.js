$(document).ready(function (){
   $('#KCNavbar .btnNavMenu').click(function (){
       $('#KCNavbar .btnNavMenu').removeClass('active');
       $(this).addClass('active');
   });

   $('#KCNavbar .btnLogin, #KCNavbar .btnAsk').click(function () {
        window.location.href = $(this).attr('data-url');
   });

    let profileMenuList = $('#KCNavbar .profileMenuList');
   $('#KCNavbar .avatar_name, #KCNavbar .avatar_img').click(function (){
       profileMenuList.removeAttr('hidden');
        if(profileMenuList.hasClass('flipInX')){
            profileMenuList.removeClass('flipInX').addClass('flipOutX');
        }
        else{
            profileMenuList.removeClass('flipOutX').addClass('flipInX');
        }
   });
   $('#KCNavbar .userProfileBtn').focusout(function (){
       profileMenuList.removeClass('flipInX').addClass('flipOutX');
   });

   $('#KCNavbar .menuBtns li').click(function(e){
        window.location.href = $(this).attr('data-url');
   });

   $('#KCNavbar .btnLang').click(function(e){
       let lang = $('html').attr('lang');
       let currentLang = 'en';
       if(lang === 'en'){
           currentLang = 'kh';
       }
       changeLangOfProgram(currentLang);
   });

   $('#KCNavbar #sideMenu .selLanguages​').change(function(){
        changeLangOfProgram($(this).val());
   });

   navigateSideMenuForMobileScreen();
});

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
