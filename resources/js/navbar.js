$(document).ready(function (){
   $('#KCNavbar .btnNavMenu').click(function (){
       $('#KCNavbar .btnNavMenu').removeClass('active');
       $(this).addClass('active');
   });

   $('#KCNavbar .btnLogin').click(function () {
        window.location.href = $(this).attr('data-url');
   });
});