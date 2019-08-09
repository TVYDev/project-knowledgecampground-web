<?php
$ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
$default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
$username = $ua[\App\Lib\UserConstants::USER_NAME];
?>
<div id="KCNavbar">
    <button id="navLogo">
        Knowledge Campground
    </button>
    <div id="navContent">
        <button type="button" class="btnAsk btn-primary" data-url="{{ route(\App\Lib\RouteConstants::QUESTION_GET_ASK) }}">
            {{ __('ask question') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-pencil-alt"></i>
        </button>
        <div class="navMenu">
            <button class="btnSubjects btnNavMenu active">
                {{ __('subjects') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-graduation-cap"></i>
            </button>
            <button class="btnQuestions btnNavMenu">
                {{ __('questions') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-book"></i>
            </button>
            <button class="btnNotifications btnNavMenu">
                {{ __('notifications') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-bell"></i>
                <span class="badge badge-pill badge-danger" hidden>23</span>
            </button>
            <button class="btnGuide btnNavMenu">
                {{ __('guide') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-question-circle"></i>
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
                {{ __('log in') }}&nbsp;&nbsp;&nbsp;<i class="fas fa-sign-in-alt"></i>
            </button>
        @endif

    </div>
</div>
