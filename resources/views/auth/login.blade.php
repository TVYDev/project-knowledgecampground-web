@extends('layouts.main')

@section('title', 'Log In')

@section('content')

<div class="loginContent">
    <div class="quoteSide">
        <span class="quoteContent">
            "Knowledge is of no value unless you put it into practice."
        </span>
        <br /><br />
        <span class="quoteAuthor">
            By Anton Chekhov
        </span>
    </div>
    <div class="formSide">
        <div class="cardContainer">
            <div class="kcCard">
                <div class="frontCard">
                    <div class="content">
                        <h2 class="formTitle">{{ __('Log In') }}</h2>
                        <form method="POST" id="formLogin" action="{{ route('user.postLogin') }}">
                            @csrf
                            <div class="ui form">
                                <div class="field">
                                    <label for="emailLogin" class="requiredField">{{ __('Email') }}</label>
                                    <input type="text" name="emailLogin" required="required" id="emailLogin" value="{{ old('emailLogin') }}">
                                </div>
                                <div class="field">
                                    <label for="passwordLogin" class="requiredField">{{ __('Password') }}</label>
                                    <input type="password" name="passwordLogin" id="passwordLogin" required="required">
                                </div>
                                <button class="ui button fluid btnPrimary" type="submit">{{ __('Log In') }}</button>
                            </div>
                        </form>
                        <div class="forgotPasswordBlock">
                            <span>{{ __('Forgot Password?') }}</span>&nbsp;
                            <a href="#" class="btnLink">{{ __('Reset now!') }}</a>
                        </div>
                        <div class="registerNowBlock">
                            <span>{{ __('Haven\'t you had an account yet?') }}</span>&nbsp;
                            <button class="btnLink btnGoToRegister">{{ __('Register now!') }}</button>
                        </div>
                        @include('layouts.partials._social_login')
                    </div>
                </div>
                <div class="backCard">
                    <div class="content">
                        <h2 class="text-center formTitle">{{ __('Register') }}</h2>
                        <form method="POST" id="formRegister" action="{{ route('user.postRegister') }}">
                            @csrf
                            <div class="ui form">
                                <div class="field">
                                    <label for="username" class="requiredField">{{ __('Username') }}</label>
                                    <input type="text" name="username" id="username" required="required" value="{{ old('username') }}">
                                </div>
                                <div class="field">
                                    <label for="emailRegister" class="requiredField">{{ __('Email') }}</label>
                                    <input type="text" name="emailRegister" id="emailRegister" required="required" value="{{ old('emailRegister') }}">
                                </div>
                                <div class="field">
                                    <label for="passwordRegister" class="requiredField">{{ __('Password') }}</label>
                                    <input type="password" name="passwordRegister" id="passwordRegister" required="required">
                                </div>
                                <button class="ui button fluid btnPrimary" type="submit">{{ __('Register') }}</button>
                            </div>
                        </form>
                        <div class="logInNowBlock">
                            <span>{{ __('Have you already had an account?') }}</span>&nbsp;
                            <button class="btnLink btnGoToLogin">{{ __('Log in now!') }}</button>
                        </div>
                        @include('layouts.partials._social_login')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
