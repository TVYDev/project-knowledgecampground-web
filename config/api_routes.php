<?php
/**
 * Created by PhpStorm.
 * User: Vannyou TANG
 * Date: 31-Mar-19
 * Time: 4:56 PM
 */

$prodHost = '';
$devHost = 'http://127.0.0.1:8000';
$host = $devHost;

return [
    'user' => [
        'login' => [
            'path'  => '/api/auth/login',
            'url'   => $host.'/api/auth/login'
        ],
        'register'  => [
            'path'  => '/api/auth/register',
            'url'   => $host.'/api/auth/register'
        ],
        'get_user'  => [
            'path'  => '/api/auth/user',
            'url'   => $host.'/api/auth/user'
        ],
        'logout' => [
            'path'  => '/api/auth/logout',
            'url'   => $host.'/api/auth/logout'
        ],
        'get_user_avatar'   => [
            'path'  => '/api/user-avatar/user-avatar',
            'url'   => $host.'/api/user-avatar/user-avatar'
        ]
    ]
];