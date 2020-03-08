@extends('layouts.main')

@section('title', 'Request Reset Password Link')

@section('content')
<div class="resetPasswordContent">
    <div class="requestResetPasswordLinkForm">
        <h2 class="pageName">{{ __('Request Reset Password Link') }}</h2>
        <div class="ui info message">
            <div class="header">
                How to reset your password?
            </div>
            <p>Please provide associated email to account you are requesting for password reset.</p>
        </div>
        <form action="{{ route(\App\Lib\RouteConstants::USER_POST_REQUEST_RESET_PASSWORD_LINK) }}" method="post" id="formRequestResetPasswordLink">
            @csrf
            <div class="ui form">
                <div class="field">
                    <label for="email" class="requiredField">{{ __('Email') }}</label>
                    <input type="email" name="email" id="email" required="required" value="{{ old('email') }}">
                </div>
                <button class="ui button fluid btnPrimary" type="submit">{{ __('Send Reset Password Link') }}</button>
            </div>
        </form>
    </div>
    <div></div>
</div>
@endsection
