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
                        <h3 class="text-center formTitle">Log In</h3>
                        {{ Form::open(['route' => 'user.postLogin', 'method' => 'post', 'id' => 'formLogin']) }}
                            <div class="form-group row">
                                {{ Form::label('emailLogin', 'Email', ['class' => 'col-md-3 col-form-label']) }}
                                <div class="col-md-9 p-0">
                                    {{ Form::text('emailLogin', '', ['class' => 'form-control', 'required' => 'required']) }}
                                </div>
                            </div>
                            <div class="form-group row">
                                {{ Form::label('passwordLogin', 'Password', ['class' => 'col-md-3 col-form-label']) }}
                                <div class="col-md-9 p-0">
                                    {{ Form::password('passwordLogin', ['class' => 'form-control', 'required' => 'required']) }}
                                </div>
                            </div>
                            <div class="form-group row">
                                {{ Form::submit('Log In', ['class' => 'btn btnSubmit']) }}
                            </div>
                        {{ Form::close() }}
                        <div class="text-center">
                            <span>Forgot Password?</span>&nbsp;
                            <a href="#" class="btnLink">Reset it now!</a>
                        </div>
                        <div class="text-center">
                            <span>Don't have an account?</span>&nbsp;
                            <button class="btnLink btnGoToRegister">Register now!</button>
                        </div>
                        @include('layouts.partials._social_login')
                    </div>
                </div>
                <div class="backCard">
                    <div class="content">
                        <h3 class="text-center formTitle">Register</h3>
                        {{ Form::open(['route' => 'user.postRegister', 'method' => 'post', 'id' => 'formRegister']) }}
                            <div class="form-group row">
                                {{ Form::label('username', 'Username', ['class' => 'col-md-3 col-form-label']) }}
                                <div class="col-md-9 p-0">
                                    {{ Form::text('username', '', ['class' => 'form-control', 'required' => 'required']) }}
                                </div>
                            </div>
                            <div class="form-group row">
                                {{ Form::label('emailRegister', 'Email', ['class' => 'col-md-3 col-form-label']) }}
                                <div class="col-md-9 p-0">
                                    {{ Form::text('emailRegister', '', ['class' => 'form-control', 'required' => 'required']) }}
                                </div>
                            </div>
                            <div class="form-group row">
                                {{ Form::label('passwordRegister', 'Password', ['class' => 'col-md-3 col-form-label']) }}
                                <div class="col-md-9 p-0">
                                    {{ Form::password('passwordRegister', ['class' => 'form-control', 'required' => 'required']) }}
                                </div>
                            </div>
                            <div class="form-group row">
                                {{ Form::submit('Register', ['class' => 'btn btnSubmit']) }}
                            </div>
                        {{ Form::close() }}
                        <div class="text-center">
                            <span>Already have an account?</span>&nbsp;
                            <button class="btnLink btnGoToLogin">Log in now!</button>
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