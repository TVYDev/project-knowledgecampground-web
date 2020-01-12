<div class="subjectAndTags">
    <span class="subjectTag" data-public-id="{{$subject->public_id}}">
        <img src="{{$subject->img_url}}" alt="subject">&nbsp;{{$subject->name_en}}
    </span>
    @if(isset($tags) && count($tags) > 0)
        <i class="fas fa-angle-double-right subjectTagSeparator"></i>
        @foreach($tags as $tag)
            <span class="tagTag" data-public-id="{{$tag->public_id}}">
                <img src="{{$tag->img_url}}" alt="tag">&nbsp;{{$tag->name_en}}
            </span>
        @endforeach
    @endif
</div>
