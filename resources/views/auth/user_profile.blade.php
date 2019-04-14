@extends('layouts.main')

@section('title','View Profile')

@section('content')

<?php
$ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
$default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
$username = $ua[\App\Lib\UserConstants::USER_NAME];
?>

<div class="userProfileContent">
    <div class="topPartData">
        <div class="personalDescription">
            <div>
                <h3 class="fullName">TANG Vannyou</h3>
                <h5 class="username">@vannyou</h5>
                <h6 class="country">
                    <span class="countryName">Cambodia</span>
                    <img src="{{ asset('icons/flag_cambodia.png') }}" alt="cambodia-flag" class="countryFlag">
                </h6>
            </div>
            <div>
                <hr class="grayLine">
            </div>
            <div class="description">
                Personal Description Lorem ipsum dolor sit amet, consecter
                quis erat gravida nisl volutpat hendrerit eu a lorem.ravida n
                drerit eu a lorem.
                Personal Description Lorem ipsum dolor sit amet, consecter
                quis erat gravida nisl volutpat hendrerit eu a lorem.ravida n
                drerit eu a lorem.
            </div>
        </div>
        <div class="avatarBlock">
            <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
            <br>
            <button class="btnEditProfile">Edit Profile</button>
        </div>
        <div class="statistics">
            <div>
                <div class="geekLevel">
                    @include('layouts.partials._geek_level_img')
                    <span class="geekLevelName">Bronze Geek</span>
                </div>
                <br>
                <div class="participationData">
                    <div>Score: <span class="score">31</span></div>
                    <div class="partialParticipationData">
                        <div>Percentage to last month: <span class="percent">+2.03%</span></div>
                        <div>Joined <span class="date">23 June 2018</span></div>
                    </div>
                </div>
            </div>
            <div>
                <hr class="grayLine">
            </div>
            <div class="activityData">
                <div>
                    <div class="numQuestion">23</div>
                    <div>Question</div>
                </div>
                <div>
                    <div class="numAnswer">12</div>
                    <div>Answer</div>
                </div>
                <div>
                    <div class="numVisitor">12</div>
                    <div>Visitor Reached</div>
                </div>
                <div>
                    <div class="numView">96</div>
                    <div>Profile Viewed</div>
                </div>
            </div>
        </div>
    </div>
    <div class="bottomPartData"></div>
</div>

@endsection