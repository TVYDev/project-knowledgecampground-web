@extends('layouts.main')

@section('title', 'Log In')

@section('content')

<div class="loginContent">
    <div class="text-center quoteSide">
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
                        <h3 class="text-center formTitle">{{ __('log in') }}</h3>
                        <form method="POST" id="formLogin" action="{{ route('user.postLogin') }}">
                            @csrf
                            <div class="form-group row">
                                    <label for="emailLogin" class="col-md-4 col-form-label">{{ __('Email') }}</label>
                                <div class="col-md-8 p-0">
                                    <input type="text" name="emailLogin" class="form-control" required="required" value="{{ old('emailLogin') }}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="passwordLogin" class="col-md-4 col-form-label">{{ __('Password') }}</label>
                                <div class="col-md-8 p-0">
                                    <input type="password" name="passwordLogin" class="form-control" required="required">
                                </div>
                            </div>
                            <div class="form-group row">
                                <input type="submit" class="btn btnSubmit" value="{{ __('Log In') }}">
                            </div>
                        </form>
                        <div class="text-center">
                            <span>{{ __('Forgot Password?') }}</span>&nbsp;
                            <a href="#" class="btnLink">{{ __('Reset now!') }}</a>
                        </div>
                        <div class="text-center">
                            <span>{{ __('Haven\'t you had an account yet?') }}</span>&nbsp;
                            <button class="btnLink btnGoToRegister">{{ __('Register now!') }}</button>
                        </div>
                        @include('layouts.partials._social_login')
                    </div>
                </div>
                <div class="backCard">
                    <div class="content">
                        <h3 class="text-center formTitle">{{ __('Register') }}</h3>
                        <form method="POST" id="formRegister" action="{{ route('user.postRegister') }}">
                            @csrf
                            <div class="form-group row">
                                <label for="username" class="col-md-4 col-form-label">{{ __('Username') }}</label>
                                <div class="col-md-8 p-0">
                                    <input type="text" name="username" class="form-control" required="required" value="{{ old('username') }}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="emailRegister" class="col-md-4 col-form-label">{{ __('Email') }}</label>
                                <div class="col-md-8 p-0">
                                    <input type="text" name="emailRegister" class="form-control" required="required" value="{{ old('emailRegister') }}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="passwordRegister" class="col-md-4 col-form-label">{{ __('Password') }}</label>
                                <div class="col-md-8 p-0">
                                    <input type="password" name="passwordRegister" class="form-control" required="required">
                                </div>
                            </div>
                            <div class="form-group row">
                                <input type="submit" value="{{ __('Register') }}" class="btn btnSubmit">
                            </div>
                        </form>
                        <div class="text-center">
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

@section('pageScript')

@endsection
