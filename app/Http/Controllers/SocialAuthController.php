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

    public function redirectToSocialProvider($provider) {
        try {
            return Socialite::driver($provider)->redirect();
        }catch(\Exception $exception) {
            return $this->doResponseError($exception, true, RouteConstants::USER_GET_LOGIN,false);
        }
    }

    public function handleSocialProviderCallback($provider) {
        try {
            $user = Socialite::driver($provider)->user();

            if(isset($user)) {
                $name = strtolower($user->getName());
                $arr = explode(' ', $name);
                if(array_key_exists(0, $arr)) {
                    $name = $arr[0];
                }
                if(!isset($name) || $name == '') {
                    throw new \UnexpectedValueException('Empty user name. Please try again.');
                }

                $response = $this->post($this->getApiRequestUrl('social_auth.login'), [
                    'email' => $user->getEmail(),
                    'name'  => $name,
                    'provider_user_id' => $user->getId(),
                    'provider' => $provider,
                    'picture' => $user->getAvatar()
                ]);

                if($response->success == true) {
                    $this->saveAccessToken($response);

                    $this->supporter->saveCommonUserInfoToSession();

                    return $this->doResponseSuccess(RouteConstants::HOME, $response->message_en, false);
                }
            }
            $provider = ucfirst($provider);
            throw new \UnexpectedValueException("Unable to get $provider credentials");
        }
        catch(\Exception $exception) {
            return $this->doResponseError($exception, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }
}
