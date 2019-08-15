<?php

namespace App\Http\Controllers;

use App\Lib\RouteConstants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;

class LocalizationController extends Controller
{
    public function index ($locale)
    {
        App::setLocale($locale);
        session()->put('locale', $locale);

        return \redirect()->back();
    }
}
