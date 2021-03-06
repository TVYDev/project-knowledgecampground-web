@extends('layouts.main')

@section('title', 'Questions')

@section('content')
    <div class="listQuestionContent">
        <div class="actualList">
            <div class="headListQuestion pageTitle">
                <div><i class="fas fa-book"></i></div>
                <div><span>{{ __('List of Questions') }}</span></div>
            </div>
            @include('layouts.partials._list_of_items')
        </div>
        <div class="extraRightSpace"></div>
    </div>
@endsection
