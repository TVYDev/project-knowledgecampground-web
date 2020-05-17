@extends('layouts.main')

@if($isEditingAnswer)
    @section('title', 'Edit Answer')
@else
    @section('title', 'View Question')
@endif

@section('content')
<?php
$default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
$username = session(\App\Lib\SessionConstants::USER_NAME);
$user_public_id = session(\App\Lib\SessionConstants::USER_PUBLIC_ID);
?>
    <div class="pageViewQuestion">
        <div class="leftExtraSpace"></div>
        <div class="viewQuestionContent">
            <input type="hidden" name="userPublicId"  value="{{ $user_public_id }}">
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
                        <tvy-content-action-view id="{{ $answer->public_id }}" data-for="answer" data-current-avatar-url="{{$default_avatar_url}}" data-current-username="{{ $username }}" data-public-id="{{ $answer->public_id }}"></tvy-content-action-view>
                    @endforeach
                @else
                    @if(!$isEditingAnswer)
                        <div class="headerListAnswers headerList">
                            <div>
                                <i class="fas fa-lightbulb"></i>
                                <span class="numRecords">No Answer</span>
                            </div>
                        </div>
                    @endif
                @endif
            </div>
        </div>
        <div class="rightExtraSpace"></div>
    </div>
    <h3 class="headerWriteYourAnswer" id="titleEditingAnswer"><i class="fas fa-pen-alt"></i>&nbsp;&nbsp;
        @if($isEditingAnswer)
            Edit your answer below
        @else
            Write your own answer below
        @endif
    </h3>
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
                    data-content-type="answer"
                    @if($isEditingAnswer)
                        data-is-existing="true"
                    @endif
                >
                </tvy-content-editor>
                <button type="submit" name="submit" value="post" class="ui button btnPostQuestion btnFormPrimary">
                    <span>
                        @if($isEditingAnswer)
                            {{ __('Update my answer') }}
                        @else
                            {{ __('Post my answer') }}
                        @endif
                    </span>&nbsp;&nbsp;&nbsp;<i class="far fa-paper-plane"></i>
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
