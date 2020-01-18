<div class="listOfItems">
    @if(!empty($items))
        @foreach($items as $item)
            @php
                $subject = $item->subject;
                $tags = $item->tags;
            @endphp
            <div class="item">
                <div class="basicInfo">
                    <div class="title">
                        <a href="{{route(\App\Lib\RouteConstants::QUESTION_GET_VIEW, [$item->public_id])}}">{{$item->title}}</a>
                    </div>
                    <div class="authorInfo">
                        <span>{{$item->readable_time_en}} By</span>
                        <a href="#" class="authorName">{{$item->author->name}}</a>
                    </div>
                    @include('layouts.partials._subject_tags')
                </div>
                <div class="stats">123<br/>votes</div>
            </div>
        @endforeach
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
    @else
        {{ __('No Records') }}
    @endif
</div>
