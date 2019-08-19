<?php
/**
 * Created by PhpStorm.
 * User: Vannyou TANG
 * Date: 31-Mar-19
 * Time: 4:47 PM
 */

namespace App\Lib;


use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use Illuminate\Http\Request;

trait RequestAPI
{
    /**********************************************************************************************
     * Make HTTP Request
     *
     * @param string $url
     * @param $method
     * @param null $data
     * @param null $headers
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     **********************************************************************************************/
    public function call (string $url, $method, $data = null, $headers = null)
    {
        $http = new Client();

        $response = $http->request($method, $url, [
            'headers'   => isset($headers) ? $headers : [],
            'json'      => isset($data) ? $data : []
        ]);

        $dataResponse = json_decode($response->getBody()->getContents());

        return $dataResponse;
    }

    public function delete (string $url, $data = null, $headers = null)
    {
        return self::call($url, HttpConstants::METHOD_DELETE, $data, $headers);
    }

    public function get (string $url, $data = null, $headers = null)
    {
        return self::call($url, HttpConstants::METHOD_GET, $data, $headers);
    }

    public function post (string $url, $data = null, $headers = null)
    {
        return self::call($url, HttpConstants::METHOD_POST, $data, $headers);
    }

    public function put (string $url, $data = null, $headers = null)
    {
        return self::call($url, HttpConstants::METHOD_PUT, $data, $headers);
    }

    public function getAuthorizationHeader()
    {
        return [
            'Authorization' => self::getAccessToken(),
            'Content-Type'  => 'application/json'
        ];
    }
    /**********************************************************************************************
     * END (Make HTTP Request)
     **********************************************************************************************/



    /**
     * Get the access token from session
     *
     * @return \Illuminate\Session\SessionManager|\Illuminate\Session\Store|mixed|string
     */
    public function getAccessToken ()
    {
        return (\request()->session()->has(HttpConstants::KEY_TO_TOKEN_IN_SESSION))
            ? session(HttpConstants::KEY_TO_TOKEN_IN_SESSION) : '';
    }

    /**
     * Get url for API request
     *
     * @param string $subjectRequest
     * @return \Illuminate\Config\Repository|mixed
     */
    public function getApiRequestUrl (string $subjectRequest)
    {
        return config('api_routes.'.$subjectRequest.'.url');
    }

    /**
     * Get Error Message for all errors, using in try-catch block
     *
     * @param \Exception $exception
     * @param bool $isIncludedTrace
     * @return string
     */
    public function getErrorMessage (\Exception $exception, $isIncludedTrace = false)
    {
        $message = $exception->getMessage() . $isIncludedTrace ? $exception->getTraceAsString() : '';
        if($exception instanceof ClientException){
            $json = json_decode($exception->getResponse()->getBody()->getContents());
            $message = $json->message;
        }
        else if($exception instanceof ConnectException){
            $message = "Server is not running.";
        }
        return $message;
    }

    /**
     * Save access token obtained from login success into session
     *
     * @param $response
     */
    public function saveAccessToken ($response)
    {
        session([HttpConstants::KEY_TO_TOKEN_IN_SESSION => $response->data->token_type.' '.$response->data->access_token]);
    }

    /**
     * Save user_avatar to session
     *
     * @param $userAvatar
     */
    public function saveUserAvatarToSession ($userAvatar)
    {
        $ua[UserConstants::USER_NAME] = $userAvatar->data->name;
        if($userAvatar->data->is_active){
            $ua[UserConstants::USER_AVATAR_SVG_URL] = HttpConstants::HOST_URL . $userAvatar->data->default_avatar_url;
        }
        else
        {
            $ua[UserConstants::USER_AVATAR_IMG_URL] = HttpConstants::HOST_URL . $userAvatar->img_url;
        }

        session([UserConstants::KEY_TO_USER_AVATAR => $ua]);
    }
}
