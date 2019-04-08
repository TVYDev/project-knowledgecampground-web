$(document).ready(function (){
   $('#KCNavbar .btnNavMenu').click(function (){
       $('#KCNavbar .btnNavMenu').removeClass('active');
       $(this).addClass('active');
   });

   $('#KCNavbar .btnLogin').click(function () {
        window.location.href = $(this).attr('data-url');
   });

    let profileMenuList = $('#KCNavbar .profileMenuList');
   $('#KCNavbar .avatar_name, #KCNavbar .avatar_img').click(function (){
        profileMenuList.toggleClass('profileMenuListHidden');
        profileMenuList.removeClass('flipInX');
        if(!profileMenuList.hasClass('profileMenuListHidden')){
            profileMenuList.addClass('animated flipInX');
        }
   });
   $('#KCNavbar .userProfileBtn').focusout(function (){
       profileMenuList.addClass('profileMenuListHidden');
       profileMenuList.removeClass('flipInX');
   });

   $('#KCNavbar .menuBtns li').click(function(e){
        window.location.href = $(this).attr('data-url');
   });
});