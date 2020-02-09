<?php
$default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
$username = session(\App\Lib\SessionConstants::USER_NAME);
?>
<div id="KCNavbar">
    <button id="navLogo">
        <div>
            <div><i class="fas fa-bars" id="btnSideMenu" data-side-menu="closed"></i></div>
            <img src="{{ asset('icons/logos/KC_white_standard.png') }}" alt="KC" class="KCLogo">
        </div>
    </button>
    <div id="navContent">
        <button type="button" class="btnAsk btn-primary" data-url="{{ route(\App\Lib\RouteConstants::QUESTION_GET_POST) }}">
            <span>{{ __('Ask Question') }}</span><i class="fas fa-feather-alt"></i>
        </button>
        <div class="navSearchBar">
            <div class="ui fluid icon input">
                <input type="text" placeholder="{{ __('Search Question...') }}" class="txtSearch"
                    data-url="{{ route(\App\Lib\RouteConstants::QUESTION_GET_LIST) }}" value="{{\Illuminate\Support\Facades\Input::get('search')}}">
                <i class="search icon"></i>
            </div>
        </div>
        <div class="navMenu">
            <button class="btnQuestions btnNavMenu btnWithToolTip" data-url="{{ route(\App\Lib\RouteConstants::QUESTION_GET_LIST) }}"
                data-content="{{ __('All Questions') }}" data-position="bottom center" data-variation="mini">
                <i class="fas fa-book"></i>
            </button>
            <button class="btnTags btnNavMenu btnWithToolTip" data-content="{{ __('All Tags') }}" data-position="bottom center" data-variation="mini">
                <i class="fas fa-tags"></i>
            </button>
            <button class="btnNotifications btnNavMenu btnWithToolTip" data-content="{{ __('Notifications') }}" data-position="bottom center" data-variation="mini">
                <i class="fas fa-bell"></i>
            </button>
            <button class="btnGuide btnNavMenu btnWithToolTip" data-content="{{ __('Guide') }}" data-position="bottom center" data-variation="mini">
                <i class="fas fa-question-circle"></i>
            </button>
            <button class="btnLang btnNavMenu btnWithToolTip">
                <i class="fas fa-keyboard"></i>
            </button>
            @include('layouts.partials._language_list')
            <button class="btnLogo btnNavMenu">
                <img src="{{ asset('icons/logos/KC_black_standard.png') }}" alt="KC" class="KCLogo">
            </button>
        </div>
        @if(session(\App\Lib\HttpConstants::KEY_TO_KC_USER_AUTHENTICATED) === \App\Lib\HttpConstants::KC_USER_VALID)
            <div class="blockAvatarImg"><img class="avatarImg" src="{{$default_avatar_url}}" alt="avatar_image"></div>
            @include('layouts.partials._user_profile_menu')
        @else
            <button type="button" class="btnLogin btn-primary" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_LOGIN) }}">
                <span>{{ __('Log In') }}</span><i class="fas fa-sign-in-alt"></i>
            </button>
        @endif
    </div>
    <div id="sideMenu">
        <div class="logo">
            <img src="{{ asset('icons/logos/KC_white_standard.png') }}" alt="KC" class="KCLogo">
        </div>
        <hr>
        <div>
            <form action="#" class="formGeneralSearch">
                <input type="text" class="form-control" placeholder="{{ __('Search...') }}">
            </form>
        </div>
        <div class="menuTitle">{{ __('Main Features') }}</div>
        <div class="sideMenuButtons menuList">
            <button class="btnSubjects">
                <i class="fas fa-graduation-cap"></i>&nbsp;&nbsp;&nbsp;<span>{{ __('subjects') }}</span>
            </button>
            <button class="btnQuestions">
                <i class="fas fa-book"></i>&nbsp;&nbsp;&nbsp;<span>{{ __('questions') }}</span>
            </button>
            <button class="btnNotifications">
                <i class="fas fa-bell"></i>&nbsp;&nbsp;&nbsp;<span>{{ __('notifications') }}</span>
            </button>
            <button class="btnGuide">
                <i class="fas fa-question-circle"></i>&nbsp;&nbsp;&nbsp;<span>{{ __('guide') }}</span>
            </button>
        </div>
        <div class="menuTitle">{{ __('Settings') }}</div>
        <div class="sideMenuSettings menuList">
            <div class="languageSetting">
                <label for="languages"><i class="fas fa-globe"></i>&nbsp;&nbsp;&nbsp;{{ __('Language options') }}</label>
                <select name="languages" class="selLanguages​ form-control" id="languages">
                    @if(app()->getLocale() === 'en')
                        <option value="en" selected>English</option>
                        <option value="kh">ភាសាខ្មែរ</option>
                    @else
                        <option value="en">English</option>
                        <option value="kh" selected>ភាសាខ្មែរ</option>
                    @endif
                </select>
            </div>
        </div>
    </div>
</div>
