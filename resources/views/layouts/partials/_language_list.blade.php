<div class="ui custom popup transition hidden languageList">
    @if(app()->getLocale() === 'en')
        <div><i class="kh flag"></i>ខ្មែរ</div>
        <div class="active"><i class="us flag"></i>English</div>
    @else
        <div class="active"><i class="kh flag"></i>ខ្មែរ</div>
        <div><i class="us flag"></i>English</div>
    @endif
</div>
