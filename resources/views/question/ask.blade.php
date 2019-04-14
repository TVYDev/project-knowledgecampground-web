@extends('layouts.main')

@section('title', 'Ask Question')

@section('content')
    <div class="askQuestionContent">
        <div class="questionCreation">
            <div class="headAskQuestion">
                <div><i class="fas fa-feather-alt"></i></div>
                <div><span>Ask a question</span></div>
            </div>
            <div class="questionTips">
                <p class="m-0 p-0">
                    <strong>Tips for a good question</strong>
                </p>
                <p class="m-0 tipText">
                    - Choose the right subject to get quick and right answer<br>
                    - Keep it short with necessary details<br>
                    - Provide relevant tags to get a response faster
                </p>
            </div>
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

                    </div>
                </form>
            </div>
        </div>
        <div class="questionPreview">

        </div>
    </div>
@endsection