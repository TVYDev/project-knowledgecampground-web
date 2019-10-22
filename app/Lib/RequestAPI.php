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
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Symfony\Component\Debug\Exception\FatalThrowableError;
use function GuzzleHttp\Psr7\str;

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
    public function call (string $url, $method, $data = null, $headers = null, $requestOption = null)
    {
        try{
            $http = new Client();

            $response = $http->request($method, $url, [
                'headers'       => isset($headers) ? $headers : [],
                isset($requestOption) ? $requestOption : 'json'  => isset($data) ? $data : []
            ]);

            return json_decode($response->getBody()->getContents());
        }
        catch(RequestException $exception)
        {
            try
            {
                $response = $exception->getResponse();
                if(isset($response) && strpos(str($exception->getResponse()), HttpConstants::ERROR_CODE_TOKEN_EXPIRED)){
                    $httpNew = new Client();
                    $responseNew = $httpNew->request('POST', self::getApiRequestUrl('user.refresh_token'), [
                        'headers'   => self::getAuthorizationHeader()
                    ]);
                    $dataResponseNew = json_decode($responseNew->getBody()->getContents());

                    if($dataResponseNew->success){
                        self::saveAccessToken($dataResponseNew);

                        $httpResendToResource = new Client();

                        $responseAfterResend = $httpResendToResource->request($method, $url, [
                            'headers'   => self::getAuthorizationHeader(),
                            'json'      => isset($data) ? $data : []
                        ]);

                        return json_decode($responseAfterResend->getBody()->getContents());
                    }
                    throw $exception;
                }
                else
                {
                    throw $exception;
                }
            }
            catch(\Exception $e)
            {
                throw $exception;
            }
        }
    }

    public function delete (string $url, $keyCondition = null, $data = null, $headers = null, $requestOption = null)
    {
        if($keyCondition)
        {
            $url .= "/$keyCondition";
        }
        return self::call($url, HttpConstants::METHOD_DELETE, $data, $headers, $requestOption);
    }

    public function get (string $url, $keyCondition = null, $data = null, $headers = null, $requestOption = null)
    {
        if($keyCondition)
        {
            $url .= "/$keyCondition";
        }
        return self::call($url, HttpConstants::METHOD_GET, $data, $headers, $requestOption);
    }

    public function post (string $url, $data = null, $headers = null, $requestOption = null)
    {
        return self::call($url, HttpConstants::METHOD_POST, $data, $headers, $requestOption);
    }

    public function put (string $url, $keyCondition = null, $data = null, $headers = null, $requestOption = null)
    {
        if($keyCondition)
        {
            $url .= "/$keyCondition";
        }
        return self::call($url, HttpConstants::METHOD_PUT, $data, $headers, $requestOption);
    }

    public function getAuthorizationHeader($isIncludedAuthorizationHeader = true, $otherHeadersBesidesContentTypeApplicationJson = null)
    {
        $tempHeaders = [];
        if($isIncludedAuthorizationHeader){
            $tempHeaders['Authorization'] = self::getAccessToken();
        }
        if(isset($otherHeadersBesidesContentTypeApplicationJson)){
//            $tempHeaders = array_merge($tempHeaders, $otherHeadersBesidesContentTypeApplicationJson);
        }else{
            $tempHeaders['Content-Type'] = 'application/json';
        }

        return $tempHeaders;
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
            $stringResponse = str($exception->getResponse());
            $match = null;
            $result = preg_match('/.*({"success".*}})/', $stringResponse, $match);
            if($result === 1){
                $json = json_decode($match[0]);
                $message = $json->message_sys;
            }
            else {
                $message = $stringResponse;
            }
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
