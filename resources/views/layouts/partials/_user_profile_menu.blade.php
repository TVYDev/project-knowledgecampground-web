<div class="ui custom popup transition hidden userProfileMenu">
    <div class="username">
        {{$username}}
    </div>
    <div>
        <ul class="menuBtns">
            <li class="btnViewProfile" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_VIEW_USER_PROFILE) }}">{{ __('View Profile') }}</li>
            @if(\App\Http\Support\Permission::can(\App\Http\Support\Permission::CAN_CHANGE_PASSWORD))
                <li class="btnChangePassword" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_CHANGE_PASSWORD) }}">{{ __('Change Password') }}</li>
            @endif
            <li class="btnLogout" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_LOGOUT) }}">{{ __('Log Out') }}</li>
        </ul>
    </div>
</div>
