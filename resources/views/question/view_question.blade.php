@extends('layouts.main')

@section('title', 'View Question')

@section('content')
<?php
$ua = session(\App\Lib\UserConstants::KEY_TO_USER_AVATAR);
$default_avatar_url = $ua[\App\Lib\UserConstants::USER_AVATAR_SVG_URL];
$username = $ua[\App\Lib\UserConstants::USER_NAME];
?>
    <div class="pageViewQuestion">
        <div class="leftExtraSpace"></div>
        <div class="viewQuestionContent">
            <input type="hidden" name="questionPublicId" value="{{ $questionPublicId }}">
            <div class="titleBlock">
                <i class="far fa-star questionFavorite"></i>
                <h2 class="questionTitle">{{ $title }}</h2>
            </div>
            @include('layouts.partials._subject_tags')
            <tvy-content-action-view data-for="currentQuestion" data-current-avatar-url="{{$default_avatar_url}}" data-current-username="{{ $username }}" data-public-id="{{ $questionPublicId }}"></tvy-content-action-view>
            <div class="answerBlock">
                @if(!empty($answers))
                    <div class="headerListAnswers headerList">
                        <div>
                            <i class="fas fa-lightbulb"></i>
                            <span class="numRecords">{{ count($answers) . ' Answer' . (count($answers) > 1 ? 's' : '') }}</span>
                        </div>
                    </div>
                    @foreach($answers as $answer)
                        <tvy-content-action-view data-for="answer" data-current-avatar-url="{{$default_avatar_url}}" data-current-username="{{ $username }}" data-public-id="{{ $answer->public_id }}"></tvy-content-action-view>
                    @endforeach
                @else
                    <div class="headerListAnswers headerList">
                        <div>
                            <i class="fas fa-lightbulb"></i>
                            <span class="numRecords">No Answer</span>
                        </div>
                    </div>
                @endif
            </div>
        </div>
        <div class="rightExtraSpace"></div>
    </div>
    <h3 class="headerWriteYourAnswer"><i class="fas fa-pen-alt"></i>&nbsp;&nbsp;Write your own answer below</h3>
    <div class="answerQuestionBlock">
        <div class="answerCreation">
            <form action="{{ route(\App\Lib\RouteConstants::ANSWER_POST_POST) }}" method="POST" id="formAnswerQuestion">
                @csrf
                <input type="hidden" name="publicId" value="{{ $answerPublicId }}">
                <input type="hidden" name="referencePublicId" value="{{ $questionPublicId }}">
                <tvy-content-editor
                    class="col-md-12"
                    data-public-id="{{ $answerPublicId }}"
                    data-reference-public-id="{{ $questionPublicId  }}"
                    data-content-type="answer">
                </tvy-content-editor>
                <button type="submit" name="submit" value="post" class="ui button btnPostQuestion btnFormPrimary">
                    <span>{{ __('Post my answer') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
        <div class="answerContentManagement">
            <tvy-content-management-preview data-for="currentAnswer" data-public-id="{{ $answerPublicId }}"></tvy-content-management-preview>
        </div>
    </div>
@endsection
@section('pageScript')
    <script type="text/javascript" src="{{ asset('js/module/view_question.js') }}"></script>
@endsection
