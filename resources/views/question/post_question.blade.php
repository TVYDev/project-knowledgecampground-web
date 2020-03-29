@extends('layouts.main')

@section('title', 'Ask Question')

@section('content')
    <?php
    $default_avatar_url = session(\App\Lib\SessionConstants::USER_AVATAR_URL);
    $username = session(\App\Lib\SessionConstants::USER_NAME);
    ?>

    <div class="askQuestionContent">
        <div class="questionCreation">
            <div class="headAskQuestion pageTitle">
                <div><i class="fas fa-feather-alt"></i></div>
                <div><span>{{ __('Ask Question') }}</span></div>
            </div>
            <div class="askQuestionForm">
                <form action="{{ route(\App\Lib\RouteConstants::QUESTION_POST_POST) }}" method="POST" id="formAskQuestion">
                    @csrf
                    <div class="ui form">
                        <div class="field">
                            <label for="title" class="requiredField">{{ __('Title') }}</label>
                            <input type="text" class="questionTitle" id="title" name="title" placeholder="{{ __('Keep your title short and simple') }}" required="required" value="{{@$title}}">
                        </div>
                        <div class="field">
                            <label for="description" class="requiredField"><strong>{{ __('Description') }}</strong></label>
                            <div class="descriptionBlock col-md-12 m-0 p-0"></div>
                            <input type="hidden" name="publicId" value="{{ $publicId }}">
                            <tvy-content-editor class="col-md-12" data-public-id="{{ $publicId }}" data-is-existing="true"></tvy-content-editor>
                        </div>
                        <div class="field">
                            <label for="subject" class="requiredField">{{ __('Subject') }}</label>
                            <div class="ui fluid selection dropdown subjectOfQuestion">
                                <input type="hidden" name="subject" value="{{ @$chosenSubject }}">
                                <i class="dropdown icon"></i>
                                <div class="default text">{{ __('Choose a subject') }}</div>
                                <div class="menu">
                                    @foreach($subjectsData as $s)
                                        <div class="item" data-value="{{$s->public_id}}">
                                            <img class="ui mini avatar image" src="{{$s->img_url}}">
                                            {{$s->name_en}}
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label for="tags" class="requiredField">{{ __('Tags') }}</label>
                            <div class="ui fluid multiple search selection dropdown tagsOfQuestion">
                                <input type="hidden" name="tags" value="{{ @$chosenTags }}">
                                <i class="dropdown icon"></i>
                                <div class="default text">{{ __('Choose related tags (maximum 3 tags)') }}</div>
                                <div class="menu"></div>
                            </div>
                        </div>
                        <button type="submit" name="submit" value="post" class="ui button btnPostQuestion btnFormPrimary">
                            <span>{{ __('Post my question') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="questionContentManagement">
            <tvy-content-management-preview data-for="currentQuestion" data-public-id="{{ $publicId }}"></tvy-content-management-preview>
        </div>
    </div>
@endsection
@section('pageScript')
    <script type="text/javascript" src="{{ asset('js/module/post_question.js') }}"></script>
@endsection
