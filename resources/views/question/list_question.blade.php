@extends('layouts.main')

@section('title', 'Questions')

@section('content')
    <div class="listQuestionContent">
        <div class="actualList">
            <div class="headListQuestion headOfPage">
                <div><i class="fas fa-book"></i></div>
                <div><span>List of Questions</span></div>
            </div>
            @include('layouts.partials._list_of_items')
        </div>
        <div class="extraRightSpace"></div>
    </div>
@endsection
