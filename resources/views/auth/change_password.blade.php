@extends('layouts.main')

@section('title','Change Password')

@section('content')
    <?php
    $ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
    $default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
    $username = $ua[\App\Lib\UserConstants::USER_NAME];
    ?>
    <div class="changePasswordContent">
        <div class="briefInfo">
            <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
            <h3 class="fullname">TANG Vannyou</h3>
            <h5 class="username">{{'@'.$username}}</h5>
            <br>
            <h5 class="email">vannyou@kc.com</h5>
        </div>
        <div class="changePasswordForm">
            <h3>Change Password</h3><br>
            <form action="{{ route(\App\Lib\RouteConstants::USER_POST_CHANGE_PASSWORD) }}" method="post" id="formChangePassword">
                @csrf
                <div class="form-group row">
                    <label for="currentPassword" class="col-md-3 col-form-label">Current Password</label>
                    <div class="col-md-4 p-0">
                        <input type="password" name="currentPassword" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="newPassword" class="col-md-3 col-form-label">New Password</label>
                    <div class="col-md-4 p-0">
                        <input type="password" name="newPassword" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="newPassword_confirmation" class="col-md-3 col-form-label">Confirm New Password</label>
                    <div class="col-md-4 p-0">
                        <input type="password" name="newPassword_confirmation" class="form-control" required="required">
                    </div>
                </div>
                <div class="form-group row">
                    <input type="submit" class="btn btnSubmit col-7" value="Change Password">
                </div>
            </form>
            <div class="notice">
                <p class="p-0 m-0">
                    <strong>NOTICE:</strong><br>
                    You will be required to login again with your new password in all synced devices
                    <br>after current password is changed successfully.
                </p>
            </div>
        </div>
    </div>
@endsection