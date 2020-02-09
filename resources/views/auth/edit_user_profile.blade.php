@extends('layouts.main')

@section('title', 'Edit Profile')

@section('content')
    <?php
    $default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
    $username = session(\App\Lib\SessionConstants::USER_NAME);

    $country = '';
    if(isset($data) && isset($data->country)){
        $country = $data->country->code;
    }
    ?>
    <div class="editProfileContent">
        <div class="briefInfo">
            <div class="blockAvatar">
                <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
                <button class="btnChangeAvatar">Change Avatar Image</button>
            </div>
            <h3 class="username">{{'@'.$username}}</h3>
        </div>
        <div class="editProfileForm">
            <h2 class="pageName">{{ __('Edit Profile') }}</h2>
            <div class="ui section divider"></div>
            <form action="{{ route(\App\Lib\RouteConstants::USER_POST_EDIT_USER_PROFILE) }}" method="post" id="formEditProfile">
                @csrf
                <input type="hidden" name="imgAvatar" class="imgAvatar">
                <div class="ui form">
                    <div class="ui header">Public Information</div>
                    <div class="field">
                        <label for="country">{{ __('Which country are you from?') }}</label>
                        @include('layouts.partials._countries_dropdown')
                    </div>
                    <div class="field">
                        <label for="position">{{ __('Position') }}</label>
                        <input type="text" name="position" id="position" placeholder="{{ __('e.g. Web Developer') }}" value="{{ @$data->position }}">
                    </div>
                    <div class="field">
                        <label for="location">{{ __('Location (Workplace/School/University)') }}</label>
                        <input type="text" name="location" id="location" placeholder="{{ __('e.g. ABC Company') }}" value="{{ @$data->location }}">
                    </div>
                    <div class="field">
                        <label for="aboutMe">{{ __('About Me') }}</label>
                        <textarea name="aboutMe" id="aboutMe" rows="5">{{ @$data->about_me }}</textarea>
                    </div>
                    <div class="ui hidden divider"></div>
                    <div class="ui header">Social Contacts</div>
                    <div class="two fields">
                        <div class="field">
                            <label for="websiteLink">{{ __('Website Link') }}</label>
                            <div class="ui left icon input">
                                <input type="text" name="websiteLink" id="websiteLink" value="{{ @$data->website_link }}">
                                <i class="linkify icon"></i>
                            </div>
                        </div>
                        <div class="field">
                            <label for="facebookLink">{{ __('Facebook Link') }}</label>
                            <div class="ui left icon input">
                                <input type="text" name="facebookLink" id="facebookLink" value="{{ @$data->facebook_link }}">
                                <i class="facebook f icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label for="twitterLink">{{ __('Twitter Link') }}</label>
                            <div class="ui left icon input">
                                <input type="text" name="twitterLink" id="twitterLink" value="{{ @$data->twitter_link }}">
                                <i class="twitter icon"></i>
                            </div>
                        </div>
                        <div class="field">
                            <label for="telegramLink">{{ __('Telegram Link') }}</label>
                            <div class="ui left icon input">
                                <input type="text" name="telegramLink" id="telegramLink" value="{{ @$data->telegram_link }}">
                                <i class="telegram plane icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="ui hidden divider"></div>
                    <div class="ui header">Private Information</div>
                    <div class="field">
                        <label for="fullName">{{ __('Full Name (Not visible to public views)') }}</label>
                        <input type="text" name="fullName" id="fullName" value="{{ @$data->full_name }}">
                    </div>
                    <div class="ui hidden divider"></div>
                    <button class="ui button fluid btnPrimary" type="submit">{{ __('Update Profile') }}</button>
                </div>
            </form>
        </div>
        <div></div>
    </div>
@endsection
