<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 04-Apr-19
 * Time: 5:41 AM
 */

namespace App\Lib;


class RouteConstants
{
    const HOME = 'home';
    /************************************************************
     * Route for UserController
     ***********************************************************/
    const USER_GET_LOGIN = 'user.getLogin';
    const USER_POST_LOGIN = 'user.postLogin';
    const USER_GET_LOGOUT = 'user.getLogout';
    const USER_POST_REGISTER = 'user.postRegister';
    const USER_GET_CHANGE_PASSWORD = 'user.getChangePassword';
    const USER_POST_CHANGE_PASSWORD = 'user.postChangePassword';
    const USER_GET_VIEW_USER_PROFILE = 'user.getViewUserProfile';
    /***********************************************************/
}