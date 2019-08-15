<button class="userProfileBtn">
    <div class="blockProfile">
        <div class="avatar_img_block">
            <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
        </div>
        <div class="avatar_name">{{$username}}</div>
        <div class="profileMenuList animated" hidden="hidden">
            <div>
                <i class="fas fa-sort-up"></i>
                <ul class="menuBtns">
                    <li class="btnViewProfile" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_VIEW_USER_PROFILE) }}">{{ __('View Profile') }}</li>
                    <li class="btnChangePassword" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_CHANGE_PASSWORD) }}">{{ __('Change Password') }}</li>
                    <li class="btnLogout" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_LOGOUT) }}">{{ __('Log Out') }}</li>
                </ul>
            </div>
        </div>
    </div>
</button>
