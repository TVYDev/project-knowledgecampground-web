$(document).ready(function(){
    $('.selectCountry').dropdown({
        forceSelection: false
    });

    $('.editProfileContent .btnChangeAvatar').click(function(e) {
        $('.ui.modal.whiteBasicModal .header').html('Change Avatar Image');
        $('.ui.modal.whiteBasicModal .actions').remove();

        let contentMarkUp = document.getElementById('tplModalChangeAvatar').innerHTML;

        $('.ui.modal.whiteBasicModal .content').html(contentMarkUp);

        navigateTabTypeAvatar($('.changeAvatarInModal').find('[name="typeAvatar"]:checked').val());

        $('.changeAvatarInModal .typeAvatarCheckBox').checkbox({
            onChange: function() {
                const typeAvatar = $('.changeAvatarInModal').find('[name="typeAvatar"]:checked').val();
                navigateTabTypeAvatar(typeAvatar);
            }
        });

        $('.changeAvatarInModal .cropImgBlock').css('visibility', 'hidden');
        let imageCrop = $('.changeAvatarInModal .imgTmp').croppie({
            enableExif: true,
            viewport: {
                width:200,
                height:200,
                type:'circle'
            },
            boundary:{
                width:200,
                height:200
            }
        });

        $('.changeAvatarInModal .iptAvatarImage').on('change', function(){
            const valAvatarSelect = $(this).val();
            if(valAvatarSelect !== '') {
                let reader = new FileReader();
                reader.onload = function (event) {
                    imageCrop.croppie('bind', {
                        url: event.target.result
                    });
                };
                reader.readAsDataURL(this.files[0]);
                $('.changeAvatarInModal .cropImgBlock').css('visibility', 'visible');
            }else {
                $('.changeAvatarInModal .cropImgBlock').css('visibility', 'hidden');
            }
        });

        $('.changeAvatarInModal .btnCrop').click(function(event){
            imageCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function(response){
                $('.editProfileContent .briefInfo .avatar_img').attr('src', response);
                $('.editProfileContent .editProfileForm .imgAvatar').val(response);
                $('.editProfileContent .editProfileForm .typeAvatar').val('image');
                $('.ui.modal.whiteBasicModal').modal('hide');
            })
        });

        $('.actionAvatar .btnJdenticon').click(function(event) {
            let iconUrl = $('.actionAvatar .imgJdenticon').attr('src');
            $('.editProfileContent .briefInfo .avatar_img').attr('src', iconUrl);
            $('.editProfileContent .editProfileForm .typeAvatar').val('jdenticon');
            $('.ui.modal.whiteBasicModal').modal('hide');
        });

        $('.ui.modal.whiteBasicModal').modal('show');
    });

    function navigateTabTypeAvatar (typeAvatar) {
        const useJdenticon = $('.changeAvatarInModal .actionAvatar .useJdenticon');
        const useImage = $('.changeAvatarInModal .actionAvatar .useImage');
        useJdenticon.css('display', 'none');
        useImage.css('display', 'none');
        if(typeAvatar === 'image') {
            useImage.css('display', 'block');
        }else if(typeAvatar === 'jdenticon') {
            useJdenticon.css('display', 'block');
        }
    }
});
