<?php

namespace App\Http\Controllers;

use App\Http\Support\Supporter;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    protected $supporter;

    public function __construct()
    {
        $this->supporter = new Supporter();
    }

    public function redirectToGoogleProvider() {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleProviderCallback() {
        try {
            $user = Socialite::driver('google')->user();

            if(isset($user)) {
                $response = $this->post($this->getApiRequestUrl('social_auth.google_login'), [
                    'email' => $user->getEmail(),
                    'name'  => $user->user['given_name'],
                    'google_id' => $user->getId(),
                    'picture' => $user->getAvatar()
                ]);

                if($response->success == true) {
                    $this->saveAccessToken($response);

                    $this->supporter->saveCommonUserInfoToSession();

                    return $this->doResponseSuccess(RouteConstants::HOME, $response->message_en, false);
                }
            }
            throw new \UnexpectedValueException('Unable to get Google credentials');
        }
        catch(\Exception $exception) {
            return $this->doResponseError($exception, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }
}
