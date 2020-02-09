<?
$avatar_url_jdenticon = session(\App\Lib\SessionConstants::USER_AVATAR_URL_JDENTICON);
?>
<template id="tplModalChangeAvatar">
    <div class="changeAvatarInModal">
        <div class="ui form blockOptions">
            <div class="grouped fields">
                <label>Type of Avatar:</label>
                <div class="field">
                    <div class="ui toggle checkbox typeAvatarCheckBox">
                        <input type="radio" name="typeAvatar" value="image" checked="checked">
                        <label>Uploaded Image</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox typeAvatarCheckBox">
                        <input type="radio" name="typeAvatar" value="jdenticon">
                        <label>Generated Jdenticon</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="actionAvatar">
            <div class="useJdenticon">
                <img class="imgJdenticon" src="{{ $avatar_url_jdenticon }}" alt="jdenticon">
                <button class="ui button btnFormPrimary btnJdenticon">Use Jdenticon</button>
            </div>
            <div class="useImage">
                <div class="ui form">
                    <div class="field">
                        <label for="iptAvatarImage">
                            <strong>Browse image to upload</strong>
                        </label>
                        <input type="file" class="iptAvatarImage" accept="image/*"/>
                    </div>
                </div>
                <div class="cropImgBlock">
                    <div class="imgTmp"></div>
                    <button class="ui button btnFormPrimary btnCrop">Crop & Upload image</button>
                </div>
            </div>
        </div>
    </div>
</template>
