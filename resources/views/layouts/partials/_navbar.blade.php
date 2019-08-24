<?php
$ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
$default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
$username = $ua[\App\Lib\UserConstants::USER_NAME];
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
            <span>{{ __('ask question') }}</span><i class="fas fa-pencil-alt"></i>
        </button>
        <div class="navMenu">
            <button class="btnSubjects btnNavMenu active">
                <span>{{ __('subjects') }}</span><i class="fas fa-graduation-cap"></i>
            </button>
            <button class="btnQuestions btnNavMenu">
                <span>{{ __('questions') }}</span><i class="fas fa-book"></i>
            </button>
            <button class="btnNotifications btnNavMenu">
                <span>{{ __('notifications') }}</span><i class="fas fa-bell"></i>
            </button>
            <button class="btnGuide btnNavMenu">
                <span>{{ __('guide') }}</span><i class="fas fa-question-circle"></i>
            </button>
            <button class="btnLogo btnNavMenu">
                <img src="{{ asset('icons/logos/KC_black_standard.png') }}" alt="KC" class="KCLogo">
            </button>
            <div class="navTools">
                <button class="btnSearch">
                    <i class="fas fa-search"></i>
                </button>
                <button class="btnLang">
                    <span class="KCLange">
                        @if(app()->getLocale() === 'en')
                            ENG
                        @else
                            ខ្មែរ
                        @endif
                    </span>
                </button>
            </div>
        </div>
        @if(session(\App\Lib\HttpConstants::KEY_TO_KC_USER_AUTHENTICATED) === \App\Lib\HttpConstants::KC_USER_VALID)
            @include('layouts.partials._user_avatar')
        @else
            <button type="button" class="btnLogin btn-primary" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_LOGIN) }}">
                <span>{{ __('log in') }}</span><i class="fas fa-sign-in-alt"></i>
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
