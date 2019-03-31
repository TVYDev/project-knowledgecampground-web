<?php
    $errorRegister = 'false';
    if(session(\App\Lib\HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED) == '/auth/register')
        $errorRegister = 'true';
?>

@if ($errors->any())
    <div class="kcAlertMessages" hidden="hidden" data-has-error="true" data-error-register="{{$errorRegister}}">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@elseif (\Illuminate\Support\Facades\Session::has('failure'))
    <div class="kcAlertMessages" hidden="hidden" data-has-error="true" data-error-register="{{$errorRegister}}">
        <ul>
            <li>{{\Illuminate\Support\Facades\Session::get('failure')}}</li>
        </ul>
    </div>
@elseif (\Illuminate\Support\Facades\Session::has('success'))
    <div class="kcAlertMessages" hidden="hidden" data-has-error="false" data-has-info="false">
        <ul>
            <li>{{\Illuminate\Support\Facades\Session::get('success')}}</li>
        </ul>
    </div>
@elseif (\Illuminate\Support\Facades\Session::has('info'))
    <div class="kcAlertMessages" hidden="hidden" data-has-error="false" data-has-info="true">
        <ul>
            <li>{{\Illuminate\Support\Facades\Session::get('info')}}</li>
        </ul>
    </div>
@else
@endif