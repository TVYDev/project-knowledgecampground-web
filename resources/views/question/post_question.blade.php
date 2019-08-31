@extends('layouts.main')

@section('title', 'Ask Question')

@section('content')
    <div class="askQuestionContent">
        <div class="questionCreation">
            <div class="headAskQuestion">
                <div><i class="fas fa-feather-alt"></i></div>
                <div><span>Ask a question</span></div>
            </div>
            {{-- TODO: Move to the right side, on the top of preview pane--}}
            {{--<div class="questionTips">--}}
                {{--<p class="m-0 p-0">--}}
                    {{--<strong>Tips for a good question</strong>--}}
                {{--</p>--}}
                {{--<p class="m-0 tipText">--}}
                    {{--- Choose the right subject to get quick and right answer<br>--}}
                    {{--- Keep it short with necessary details<br>--}}
                    {{--- Provide relevant tags to get a response faster--}}
                {{--</p>--}}
            {{--</div>--}}
            <div class="askQuestionForm">
                <form action="{{ route(\App\Lib\RouteConstants::QUESTION_POST_POST) }}" method="POST" id="formAskQuestion">
                    @csrf
                    <div class="ui form">
                        <div class="field">
                            <label for="subject">Choose subject</label>
                            <select name="subject" id="subject" class="ui dropdown" required="required">
                                <option value="it_programming">IT Programming</option>
                                <option value="math">Mathematics</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" placeholder="Keep your title short and simple" required="required">
                        </div>
                        <div class="field">
                            <label for="description"><strong>Description</strong></label>
                            <div class="descriptionBlock col-md-12 m-0 p-0"></div>
                            <input type="hidden" name="publicId" value="{{ $publicId }}">
                            <tvy-content-editor class="col-md-12" data-public-id="{{ $publicId }}"></tvy-content-editor>
                        </div>
                        <button type="submit" name="submit" value="post" class="ui button btnPostQuestion btnFormPrimary">
                            <span>{{ __('Post my question') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-paper-plane"></i>
                        </button>
                        <button type="submit" name="submit" value="draft" class="ui button btnSaveDraftQuestion btnFormSecondary">
                            <span>{{ __('Save as draft') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-save"></i>
                        </button>
                        <button class="ui button btnDiscardQuestion btnFormThirdly">
                            <span>{{ __('Discard') }}</span>&nbsp;&nbsp;&nbsp;<i class="fas fa-ban"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="questionPreview">
            <div class="TVYContentOrder col-md-12"></div>
        </div>
    </div>
@endsection
