@extends('layouts.main')

@section('title', 'My Posts')

@section('content')
    <div class="myPostsContent">
        <div class="actualList">
            <div class="headMyPosts pageTitle">
                <div><i class="fas fa-bookmark"></i></div>
                <div><span>{{ __('My Posts') }}</span></div>
            </div>
            <div class="listOfItems">
                @if(!empty($items))
                    @foreach($items as $item)
                        @php
                            $subject = $item->subject;
                            $tags = $item->tags;
                            $route = route(\App\Lib\RouteConstants::QUESTION_GET_VIEW, [$item->question_public_id]);
                            if($item->type === 'Q') {
                                $classType = 'questionType';
                                $readableTime = $item->question_readable_time_en;
                            }
                            elseif ($item->type === 'A') {
                                $classType = 'answerType';
                                $readableTime = $item->answer_readable_time_en;
                                $route .= '?top=' . $item->answer_public_id;
                            }
                            else {
                                $classType = null;
                                $readableTime = null;
                            }
                        @endphp
                        <div class="item">
                            <div class="info">
                                <div class="stats">
                                    <span class="postType {{ $classType }}">{{ $item->type }}</span>
                                    <span class="numVotes neutral">123</span>
                                </div>
                                <div class="basicInfo">
                                    <div class="title">
                                        <a href="{{ $route }}">{{ $item->title }}</a>
                                    </div>
                                    <div class="activityDateTime">{{ $readableTime }}</div>
                                    @include('layouts.partials._subject_tags')
                                </div>
                            </div>
                            <div class="actions">
                                <button class="btn btnEdit" data-href="{{ route(\App\Lib\RouteConstants::QUESTION_GET_EDIT, [$item->question_public_id]) }}"><i class="fas fa-edit"></i> Edit</button>
                            </div>
                        </div>
                    @endforeach
                @endif
                @if(isset($paginator))
                    {!! $paginator->getPaginatedLinks() !!}
                    @php
                        $page = $paginator->getCurrentPage();
                        $perPage = $paginator->getPerPage();
                        $total = $paginator->getTotalRecords();
                        $totalPages = $paginator->getTotalPages();
                        $numWholePages = $total / $perPage;
                        $remaining = $total % $perPage;
                        $num = $page <= $numWholePages ? $perPage : $remaining;
                    @endphp
                    {{ __('Showing') }} {{$num}} {{ __('of') }} {{$total}} {{ __('records') }}
                @endif
            </div>
        </div>
        <div class="extraRightSpace"></div>
    </div>
@endsection
