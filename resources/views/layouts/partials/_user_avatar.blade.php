

<div class="blockProfile">
    <div class="avatar_img">
        @include('layouts.partials._profile_'.(empty($angle) ? 0 : $angle).'_degree')
    </div>
    <div class="avatar_name" style="border: 1.5px solid {{$borderColorHex}};">{{$username}}</div>
</div>