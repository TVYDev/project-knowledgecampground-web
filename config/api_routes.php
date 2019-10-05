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
            'method'=> 'post',
            'path'  => '/api/auth/login',
            'url'   => $host.'/api/auth/login'
        ],
        'register'  => [
            'method'=> 'post',
            'path'  => '/api/auth/register',
            'url'   => $host.'/api/auth/register'
        ],
        'get_user'  => [
            'method'=> 'get',
            'path'  => '/api/auth/user',
            'url'   => $host.'/api/auth/user'
        ],
        'logout' => [
            'method'=> 'post',
            'path'  => '/api/auth/logout',
            'url'   => $host.'/api/auth/logout'
        ],
        'change_password' => [
            'method'=> 'post',
            'path'  => '/api/auth/change-password',
            'url'   => $host.'/api/auth/change-password'
        ],
        'get_user_avatar'   => [
            'method'=> 'get',
            'path'  => '/api/user-avatar/user-avatar',
            'url'   => $host.'/api/user-avatar/user-avatar'
        ],
        'verify_authentication' => [
            'method'=> 'get',
            'path'  => '/api/auth/verify-authentication',
            'url'   => $host.'/api/auth/verify-authentication'
        ],
        'refresh_token' => [
            'method'=> 'post',
            'path'  => '/api/auth/refresh-token',
            'url'   => $host.'/api/auth/refresh-token'
        ]
    ],
    'question' => [
        'save'  =>  [
            'method'=> 'put',
            'path'  => '/api/question/save/{publicId}',
            'url'   => $host.'/api/question/save'
        ],
        'save_during_editing' => [
            'method'=> 'post',
            'path' => '/api/question/save-during-editing',
            'url'  => $host.'/api/question/save-during-editing'
        ],
        'view' => [
            'method'=> 'get',
            'path'  => '/api/question/view/{publicId}',
            'url'   => $host.'/api/question/view'
        ],
        'description' => [
            'method'=> 'get',
            'paht'  => '/api/question/description-of/{publicId}',
            'url'   => $host.'/api/question/description-of'
        ]
    ],
    'subject' => [
        'get_all_subjects' => [
            'method' => 'get',
            'path' => '/api/subject/all-subjects',
            'url' => $host.'/api/subject/all-subjects'
        ]
    ],
    'tag' => [
        'get_tags_of_subject' => [
            'method'=> 'get',
            'path'  => '/api/tag/all-tags-of/{subjectId}',
            'url'   => $host.'/api/tag/all-tags-of'
        ]
    ],
    'support' => [
        'generate_public_id' => [
            'method'=> 'get',
            'path' => '/api/support/generate-public-id',
            'url' => $host.'/api/support/generate-public-id'
        ]
    ]
];
