@extends('layouts.main')

@section('title','Change Password')

@section('content')
    <?php
    $ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
    $default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
    $username = $ua[\App\Lib\UserConstants::USER_NAME];
    ?>
    <div class="changePasswordContent">
        <div class="briefInfo">
            <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
            <h3 class="username">{{'@'.$username}}</h3>
        </div>
        <div class="changePasswordForm">
            <h2 class="pageName">{{ __('Change Password') }}</h2><br>
            <form action="{{ route(\App\Lib\RouteConstants::USER_POST_CHANGE_PASSWORD) }}" method="post" id="formChangePassword">
                @csrf
                <div class="ui form">
                    <div class="field">
                        <label for="currentPassword">{{ __('Current password') }}</label>
                        <input type="password" name="currentPassword" id="currentPassword" required="required">
                    </div>
                    <div class="field">
                        <label for="newPassword">{{ __('New password') }}</label>
                        <input type="password" name="newPassword" id="newPassword" required="required">
                    </div>
                    <div class="field">
                        <label for="newPassword_confirmation">{{ __('Confirm new password') }}</label>
                        <input type="password" name="newPassword_confirmation" id="newPassword_confirmation" required="required">
                    </div>
                    <button class="ui button fluid btnPrimary" type="submit">{{ __('Submit change') }}</button>
                </div>
            </form>
            <div class="notice">
                <p>
                    <strong>{{ __('NOTICE') }}:</strong><br>
                    {{ __('You will be required to login again with your new password in all synced devices after current password is changed successfully.') }}
                </p>
            </div>
        </div>
        <div></div>
    </div>
@endsection
