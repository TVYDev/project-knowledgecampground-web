$(document).ready(function(){
    $('.selectCountry').dropdown({
        forceSelection: false
    });

    $('.editProfileContent .btnChangeAvatar').click(function(e) {
        $('.ui.modal.whiteBasicModal .header').html('Change Avatar Image');
        $('.ui.modal.whiteBasicModal .actions').remove();

        const contentMarkUp = `
            <div class="changeAvatarInModal">
                <div class="ui form">
                    <div class="grouped fields">
                        <label>Type of Avatar:</label>
                        <div class="field">
                            <div class="ui toggle checkbox typeAvatarCheckBox">
                                <input type="radio" name="typeAvatar" value="image" checked="checked">
                                <label>Upload Image</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui toggle checkbox typeAvatarCheckBox">
                                <input type="radio" name="typeAvatar" value="jdenticon">
                                <label>Jdenticon</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actionAvatar">
                    <div class="useJdenticon">Jdenticon</div>
                    <div class="useImage">
                        <div class="ui form">
                            <div class="field">
                                <label for="iptAvatarImage">
                                    <strong>Browse image</strong>
                                </label>
                                <input type="file" class="iptAvatarImage" accept="image/*"/>
                            </div>
                        </div>
                        <div class="cropImgBlock">
                            <div class="imgTmp"></div>
                            <button class="ui button btnCrop">Crop</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

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
                $('.ui.modal.whiteBasicModal').modal('hide');
            })
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
