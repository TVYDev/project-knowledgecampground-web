<?php

namespace App\Http\Controllers;

use App\Exceptions\KCValidationException;
use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
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

            try
            {
                // --- call API to request get user_avatar of the user
                $responseUserAvatar = $this->get($this->getApiRequestUrl('user.get_user_avatar'),null,[
                    'Authorization' => $this->getAccessToken()
                ]);

                // --- save user_avatar to session for displaying nav_bar
                $this->saveUserAvatarToSession($responseUserAvatar);
            }
            catch(\Exception $exception)
            {
            }

            return $this->doResponseSuccess(RouteConstants::HOME, $response->message, false);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e,RouteConstants::USER_GET_LOGIN,true);
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

            try
            {
                // --- call API to request get user_avatar of the user
                $responseUserAvatar = $this->get($this->getApiRequestUrl('user.get_user_avatar'),null,[
                    'Authorization' => $this->getAccessToken()
                ]);

                // --- save user_avatar to session for displaying nav_bar
                $this->saveUserAvatarToSession($responseUserAvatar);
            }
            catch(\Exception $exception)
            {
            }

            return $this->doResponseSuccess(RouteConstants::HOME, $response->message, false);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e,RouteConstants::USER_GET_LOGIN,true);
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
            $response = $this->post($this->getApiRequestUrl('user.logout'),null, [
                'Authorization' => $this->getAccessToken()
            ]);

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
            return $this->doResponseError($e,RouteConstants::USER_GET_LOGIN,true);
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
            $response = $this->get($this->getApiRequestUrl('user.get_user'), null, [
                'Authorization' => $this->getAccessToken()
            ]);

            dd($response);
        }
        catch(\Exception $e)
        {
            return $this->doResponseError($e,RouteConstants::USER_GET_LOGIN,true);
        }
    }

    /**-------------------------------------------------------------------------
     * User get view user profile
     * [GET]
     *------------------------------------------------------------------------*/
    public function getViewUserProfile ()
    {
        return view('auth.user_profile');
    }
}
