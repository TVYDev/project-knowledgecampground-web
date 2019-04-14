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
});