@extends('layouts.main')

@section('title','Change Password')

@section('content')
    <?php
    $default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
    $username = session(\App\Lib\SessionConstants::USER_NAME);
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
                        <label for="currentPassword" class="requiredField">{{ __('Current password') }}</label>
                        <input type="password" name="currentPassword" id="currentPassword" required="required">
                    </div>
                    <div class="field">
                        <label for="newPassword" class="requiredField">{{ __('New password') }}</label>
                        <input type="password" name="newPassword" id="newPassword" required="required">
                    </div>
                    <div class="field">
                        <label for="newPassword_confirmation" class="requiredField">{{ __('Confirm new password') }}</label>
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
