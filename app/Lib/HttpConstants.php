<?php
/**
 * Created by PhpStorm.
 * User: Vannyou TANG
 * Date: 31-Mar-19
 * Time: 4:45 PM
 */

namespace App\Lib;


class HttpConstants
{
    /*********************************************************
     * Http Method
     ********************************************************/
    const METHOD_POST   = 'POST';
    const METHOD_PUT    = 'PUT';
    const METHOD_DELETE = 'DELETE';
    const METHOD_GET    = 'GET';
    /********************************************************/



    /********************************************************
     * Token
     *******************************************************/
    const KEY_TO_TOKEN_IN_SESSION = 'kc_access_token';
    const TYPE_ACCESS_TOKEN = 'Bearer';
    /*******************************************************/



    /********************************************************
     * Authenticated/Valid User
     *******************************************************/
    const KEY_TO_KC_USER_AUTHENTICATED = 'kc_user_authenticated';
    const KC_USER_VALID = 'VALID';
    /*******************************************************/



    /********************************************************
     * Last route request
     ********************************************************/
    const KEY_TO_LAST_POST_ROUTE_STORED = 'kc_last_post_route_request';
    /*******************************************************/
}