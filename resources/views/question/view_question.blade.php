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
