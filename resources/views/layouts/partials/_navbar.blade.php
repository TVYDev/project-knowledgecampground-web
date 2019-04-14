<?php
$ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
$default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
$username = $ua[\App\Lib\UserConstants::USER_NAME];
?>
<div id="KCNavbar">
    <button id="navLogo">
        <i class="fab fa-servicestack fa-1-5x"></i>&nbsp;&nbsp;KnowledgeCommunity
    </button>
    <div id="navContent">
        <button type="button" class="btnAsk btn-primary">
            Ask Question&nbsp;&nbsp;&nbsp;<i class="fas fa-pencil-alt"></i>
        </button>
        <div class="navMenu">
            <button class="btnHome btnNavMenu active">
                Home&nbsp;&nbsp;&nbsp;<i class="fas fa-home"></i>
            </button>
            <button class="btnSubjects btnNavMenu">
                Subjects&nbsp;&nbsp;&nbsp;<i class="fas fa-graduation-cap"></i>
            </button>
            <button class="btnQuestions btnNavMenu">
                Questions&nbsp;&nbsp;&nbsp;<i class="fas fa-book"></i>
            </button>
            <button class="btnNotifications btnNavMenu">
                Notifications&nbsp;&nbsp;&nbsp;<i class="fas fa-bell"></i>
                <span class="badge badge-pill badge-danger" hidden>23</span>
            </button>
            <button class="btnHelp btnNavMenu">
                Help&nbsp;&nbsp;&nbsp;<i class="fas fa-question-circle"></i>
            </button>
            <div class="navTools">
                <button class="btnSearch">
                    <i class="fas fa-search"></i>
                </button>
                <button class="btnLang">
                    <span class="KCLang">ENG</span>
                </button>
            </div>
        </div>
        @if(session(\App\Lib\HttpConstants::KEY_TO_KC_USER_AUTHENTICATED) === \App\Lib\HttpConstants::KC_USER_VALID)
            @include('layouts.partials._user_avatar')
        @else
            <button type="button" class="btnLogin btn-primary" data-url="{{ route('user.getLogin') }}">
                LOG IN&nbsp;&nbsp;&nbsp;<i class="fas fa-sign-in-alt"></i>
            </button>
        @endif

    </div>
</div>
