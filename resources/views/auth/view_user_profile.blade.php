@extends('layouts.main')

@section('title','View Profile')

@section('content')

<?php
$default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
$username = session(\App\Lib\SessionConstants::USER_NAME);

$country = null;
$position = null;
$location = null;
$aboutMe = null;
if(isset($data)){
    if(isset($data->country)) {
        $country = $data->country;
    }
    $position = $data->position;
    $location = $data->location;
    $aboutMe = $data->about_me;
}
?>

<div class="userProfileContent">
    <div class="topPartData">
        <div class="personalDescription">
            <div>
                <div class="username">{{'@'}}{{$username}}</div>
                <div class="country">
                    @if(isset($country))
                        <span class="countryName">{{ $country->name_en }}</span>
                        <i class="{{$country->code}} flag countryIcon"></i>
                    @else
                        ( Your <em>country</em> is not yet set. )
                    @endif
                </div>
                <div class="position">
                    @if(isset($position))
                        {{$position}}
                        @if(isset($location))
                            at&nbsp;{{$location}}
                        @endif
                    @else
                        ( Your <em>position</em> is not yet set. )
                    @endif
                </div>
            </div>
            <div>
                <hr class="grayLine">
            </div>
            <div class="aboutMe">
                @if(isset($aboutMe))
                    {{$aboutMe}}
                @else
                    ( Your <em>about me</em> is not yet set. )
                @endif
            </div>
        </div>
        <div class="avatarBlock">
            <img class="avatar_img" src="{{$default_avatar_url}}" alt="avatar_image">
            <br>
            <button class="btnEditProfile" data-url="{{ route(\App\Lib\RouteConstants::USER_GET_EDIT_USER_PROFILE) }}">Edit Profile</button>
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
