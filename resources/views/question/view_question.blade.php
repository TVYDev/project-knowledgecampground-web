@extends('layouts.main')

@section('title', 'View Question')

@section('content')
    <div class="pageViewQuestion">
        <div class="leftExtraSpace"></div>
        <div class="viewQuestionContent">
            <div class="titleBlock">
                <i class="far fa-star questionFavorite"></i>
                <h3 class="questionTitle">{{ $title }}</h3>
            </div>
            <tvy-content-action-view
                data-question-public-id="{{ $publicId }}"
                data-readable-time="{{ $readableTime }}"
                data-author-name="{{ $authorName }}"
                data-author-id="{{ $authorId }}"
                data-avatar-url="{{ $avatarUrl }}">
            </tvy-content-action-view>
        </div>
        <div class="rightExtraSpace"></div>
    </div>
@endsection