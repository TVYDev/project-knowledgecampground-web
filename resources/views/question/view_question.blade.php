@extends('layouts.main')

@section('title', 'View Question')

@section('content')
    <div class="pageViewQuestion">
        <div class="leftExtraSpace"></div>
        <div class="viewQuestionContent">
            <div class="titleBlock">
                <i class="far fa-star questionFavorite"></i>
                <h2 class="questionTitle">{{ $title }}</h2>
            </div>
            <span class="subjectTag" data-public-id="{{$subject['public_id']}}">
                <img src="{{$subject['img_url']}}" alt="subject">&nbsp;{{$subject['name_en']}}
            </span>
            @if(isset($tags) && count($tags) > 0)
                <i class="fas fa-angle-double-right subjectTagSeparator"></i>
                @foreach($tags as $tag)
                    <span class="tagTag" data-public-id="{{$tag['public_id']}}">
                        <img src="{{$tag['img_url']}}" alt="tag">&nbsp;{{$tag['name_en']}}
                    </span>
                @endforeach
            @endif
            <tvy-content-action-view data-public-id="{{ $questionPublicId }}" data-content-type="question"></tvy-content-action-view>
            <div class="answerBlock">
                <tvy-list-content-action-view
                    data-reference-public-id="{{ $questionPublicId }}"
                    data-content-type="answer">
                </tvy-list-content-action-view>
            </div>
        </div>
        <div class="rightExtraSpace"></div>
    </div>
    <div class="answerQuestionBlock">
        <div class="answerCreation">
            <h4><i class="fas fa-pen-alt"></i>&nbsp;&nbsp;Write your answer here</h4>
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
                <button type="submit" name="submit" value="draft" class="ui button btnSaveDraftQuestion btnFormSecondary">
                    <span>{{ __('Save as draft') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-save"></i>
                </button>
            </form>
        </div>
        <div class="answerContentManagement">
            <tvy-content-management-preview data-content-type="answer" data-public-id="{{ $answerPublicId }}"></tvy-content-management-preview>
        </div>
    </div>
@endsection
