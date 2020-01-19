<?php

namespace App\Http\Controllers;

use App\Exceptions\KCValidationException;
use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use App\Http\Support\UserAvatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    public function __construct()
    {
        $this->middleware('verify_access_token')->except(['getLogin','postLogin','postRegister']);
    }

    /**-------------------------------------------------------------------------
     * User Change Password
     * [GET] [POST]
     *------------------------------------------------------------------------*/
    public function getChangePassword () {return view('auth.change_password');}
    public function postChangePassword (Request $request)
    {
        try
        {
            // --- validate inputs
            $validator = Validator::make($request->all(), [
                'currentPassword' => 'required|string',
                'newPassword' => 'required|string|confirmed'
            ]);

            if($validator->fails()){
                throw new KCValidationException(RouteConstants::USER_GET_CHANGE_PASSWORD,false,$validator);
            }

            // --- call API to change password of the user
            $response = $this->post($this->getApiRequestUrl('user.change_password'), [
                'old_password'              => $request->currentPassword,
                'new_password'              => $request->newPassword,
                'new_password_confirmation' => $request->newPassword_confirmation
            ],$this->getAuthorizationHeader());


            if($response->success == true)
            {
                // --- remove some data from session that used in nav_bar
                \request()->session()->forget(HttpConstants::KEY_TO_KC_USER_AUTHENTICATED);
                \request()->session()->forget(HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED);

                return $this->doResponseSuccess(RouteConstants::USER_GET_LOGIN, $response->message_en,false);
            }
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e, true, RouteConstants::USER_GET_CHANGE_PASSWORD,false);
        }
    }

    /**-------------------------------------------------------------------------
     * User Login
     * [GET] [POST]
     *------------------------------------------------------------------------*/
    public function getLogin () {return view('auth.login');}
    public function postLogin (Request $request) {
        try
        {
            // --- store last route (purposely for page login to flip panel register/login correctly)
            session([HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED => $request->getRequestUri()]);

            // --- validate inputs
            $validator = Validator::make($request->all(), [
                'emailLogin'    => 'required|string|email',
                'passwordLogin' => 'required|string'
            ]);

            if($validator->fails()){
                throw new KCValidationException(RouteConstants::USER_GET_LOGIN,true, $validator);
            }

            // --- call API to request login user
            $response = $this->post($this->getApiRequestUrl('user.login'), [
                'email'     => $request->emailLogin,
                'password'  => $request->passwordLogin
            ]);

            // --- save the token after login
            $this->saveAccessToken($response);

            // --- save user_avatar to session for displaying nav_bar
            $userAvatar = new UserAvatar();
            $this->saveUserAvatarToSession($userAvatar->getUserAvatar());

            return $this->doResponseSuccess(RouteConstants::HOME, $response->message_en, false);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }

    /**-------------------------------------------------------------------------
     * User Register
     * [GET]
     *------------------------------------------------------------------------*/
    public function postRegister (Request $request)
    {
        try
        {
            // --- store last route (purposely for page login to flip panel register/login correctly)
            session([HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED => $request->getRequestUri()]);

            // --- validate inputs
            $validator = Validator::make($request->all(), [
                'username'          => 'required|string|max:50',
                'emailRegister'     => 'required|string|email',
                'passwordRegister'  => 'required|string'
            ]);

            if($validator->fails()){
                throw new KCValidationException(RouteConstants::USER_GET_LOGIN,true, $validator);
            }

            // --- call API to request register user
            $response = $this->post($this->getApiRequestUrl('user.register'), [
                'name'      => $request->username,
                'email'     => $request->emailRegister,
                'password'  => $request->passwordRegister
            ]);

            // --- save token after registered
            $this->saveAccessToken($response);

            // --- save user_avatar to session for displaying nav_bar
            $userAvatar = new UserAvatar();
            $this->saveUserAvatarToSession($userAvatar->getUserAvatar());

            return $this->doResponseSuccess(RouteConstants::HOME, $response->message_en, false);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }

    /**-------------------------------------------------------------------------
     * User Logout
     * [GET]
     *------------------------------------------------------------------------*/
    public function getLogout ()
    {
        try
        {
            // --- call API to request logout user
            $response = $this->post($this->getApiRequestUrl('user.logout'),null,$this->getAuthorizationHeader());

            if($response->success == true)
            {
                // --- remove some data from session that used in nav_bar
                \request()->session()->forget(HttpConstants::KEY_TO_KC_USER_AUTHENTICATED);
                \request()->session()->forget(HttpConstants::KEY_TO_LAST_POST_ROUTE_STORED);

                return $this->doResponseSuccess(RouteConstants::USER_GET_LOGIN,'You are logged out successfully',false);
            }
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }

    /**-------------------------------------------------------------------------
     * User get user information
     * [GET]
     *------------------------------------------------------------------------*/
    public function getUser ()
    {
        try
        {
            // --- call API to request information of the user
            $response = $this->get($this->getApiRequestUrl('user.get_user'), null, null,$this->getAuthorizationHeader());

            dd($response);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e, true, RouteConstants::USER_GET_LOGIN,true);
        }
    }

    /**-------------------------------------------------------------------------
     * User get view user profile
     * [GET]
     *------------------------------------------------------------------------*/
    public function getViewUserProfile ()
    {
        try
        {
            $response = $this->get($this->getApiRequestUrl('user_profile.view'),null, null, $this->getAuthorizationHeader());
            if($response->success == true) {
                return view('auth.view_user_profile')->with('data', $response->data);
            }
            throw new \Exception('Unable to fetch you profile information. Please try again');
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError($exception, true, RouteConstants::HOME, false);
        }
    }

    public function getEditUserProfile ()
    {
        try
        {
            $response = $this->get($this->getApiRequestUrl('user_profile.view'),null, null, $this->getAuthorizationHeader());
            if($response->success == true) {
                return view('auth.edit_user_profile')->with('data', $response->data);
            }
            throw new \Exception('Unable to fetch you profile information. Please try again');
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError($exception, true, RouteConstants::USER_GET_VIEW_USER_PROFILE, false);
        }
    }

    public function postEditUserProfile (Request $request)
    {
        try
        {
            $requestedData = [
                'full_name'     => $request->fullName,
                'country_code'  => $request->country,
                'position'      => $request->position,
                'location'      => $request->location,
                'about_me'      => $request->aboutMe,
                'website_link'  => $request->websiteLink,
                'facebook_link' => $request->facebookLink,
                'twitter_link'  => $request->twitterLink,
                'telegram_link' => $request->telegramLink
            ];

            $response = $this->put(
                $this->getApiRequestUrl('user_profile.update'),
                null,
                $requestedData,
                $this->getAuthorizationHeader()
            );

            if($response->success == true)
            {
                return $this->doResponseSuccess(RouteConstants::USER_GET_VIEW_USER_PROFILE, 'Your profile is updated successfully', false);
            }
            throw new \Exception('Unable to update your profile. Please try again.');
        }
        catch (\Exception $exception)
        {
            return $this->doResponseError($exception, true, RouteConstants::USER_GET_EDIT_USER_PROFILE, true);
        }
    }
}
