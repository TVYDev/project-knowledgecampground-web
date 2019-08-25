@extends('layouts.main')

@section('title', 'View Question')

@section('content')
    <div class="pageViewQuestion">
        <div class="leftExtraSpace"></div>
        <div class="viewQuestionContent">
            <h3 class="questionTitle">Sample Title Sample Title Sample Title Sample Title Sample Title Sample Title</h3>
            <hr/>
            <tvy-content-action-view data-question-public-id="{{ $publicId }}"></tvy-content-action-view>
            <hr/>
        </div>
        <div class="rightExtraSpace"></div>
    </div>
@endsection
