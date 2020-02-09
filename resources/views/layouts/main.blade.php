<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}" type="text/css">
</head>
<body>
    @include('layouts.partials._navbar')
    @include('layouts.partials._alert_message')
    @include('layouts.partials._basic_modal')
    @include('layouts.partials._basic_white_modal')

    @include('reusable_components._template_content_action_view')
    @include('reusable_components._template_content_management_preview')

    <div id="mainContent" class="container">
        @yield('content')
    </div>
    @include('layouts.partials._footer')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    @yield('pageScript')
</body>
</html>
