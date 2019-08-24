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
                <form action="#" method="POST" id="formAskQuestion">
                    @csrf
                    <div class="form-group row">
                        <label for="subject"><strong>Choose subject</strong></label>
                        <select name="subject" class="form-control">
                            <option value="it_programming">IT Programming</option>
                            <option value="math">Mathematics</option>
                        </select>
                    </div>
                    <div class="form-group row">
                        <label for="title"><strong>Title</strong></label>
                        <input type="text" class="form-control" name="title"
                               placeholder="Keep your title short and simple">
                    </div>
                    <div class="form-group row">
                        <label for="description"><strong>Description</strong></label>
                        <div class="descriptionBlock col-md-12 m-0 p-0"></div>
                        {{--@include('layouts.partials._content_editor')--}}
                        <tvy-content-editor class="col-md-12"></tvy-content-editor>
                    </div>
                    <button class="btn btnPostQuestion btnFormPrimary">
                        <span>{{ __('Post my question') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-paper-plane"></i>
                    </button>
                    <button class="btn btnSaveDraftQuestion btnFormSecondary">
                        <span>{{ __('Save as draft') }}</span>&nbsp;&nbsp;&nbsp;<i class="far fa-save"></i>
                    </button>
                    <button class="btn btnDiscardQuestion btnFormThirdly">
                        <span>{{ __('Discard') }}</span>&nbsp;&nbsp;&nbsp;<i class="fas fa-ban"></i>
                    </button>
                </form>
            </div>
        </div>
        <div class="questionPreview">
            <div class="TVYContentOrder col-md-12"></div>
        </div>
    </div>
@endsection
