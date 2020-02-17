<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirectToGoogleProvider() {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleProviderCallback() {
        try {
            $user =Socialite::driver('google')->user();
            dd($user);
        }
        catch(\Exception $exception) {
            dd($exception->getMessage());
        }
    }
}
