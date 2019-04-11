<button class="userProfileBtn">
    <div class="blockProfile">
        <div class="avatar_img">
            @include('layouts.partials._profile_'.(empty($angle) ? 0 : $angle).'_degree')
        </div>
        <div class="avatar_name" style="border: 1.5px solid {{$borderColorHex}};">{{$username}}</div>
    </div>
    <div class="profileMenuList animated" hidden="hidden">
        <div>
            <i class="fas fa-sort-up"></i>
            <ul class="menuBtns">
                <li class="btnViewProfile" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_VIEW_USER_PROFILE) }}">View Profile</li>
                <li class="btnChangePassword" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_CHANGE_PASSWORD) }}">Change Password</li>
                <li class="btnLogout" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_LOGOUT) }}">Log Out</li>
            </ul>
        </div>
    </div>
</button>
