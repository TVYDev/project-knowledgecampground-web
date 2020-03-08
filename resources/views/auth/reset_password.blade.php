@extends('layouts.main')

@section('title', 'Reset Password')

@section('content')
<div class="resetPasswordContent">
    <div class="resetPasswordForm">
        <h2 class="pageName">{{ __('Reset Password') }}</h2><br>
        <form action="{{ route(\App\Lib\RouteConstants::USER_POST_RESET_PASSWORD) }}" method="post" id="formResetPassword">
            @csrf
            <input type="hidden" name="resetToken" value="{{ isset($token) ? $token : null }}" />
            <div class="ui form">
                <div class="field">
                    <label for="newPassword" class="requiredField">{{ __('New password') }}</label>
                    <input type="password" name="newPassword" id="newPassword" required="required">
                </div>
                <div class="field">
                    <label for="newPassword_confirmation" class="requiredField">{{ __('Confirm new password') }}</label>
                    <input type="password" name="newPassword_confirmation" id="newPassword_confirmation" required="required">
                </div>
                <button class="ui button fluid btnPrimary" type="submit">{{ __('Reset Now') }}</button>
            </div>
        </form>
    </div>
    <div></div>
</div>
@endsection
