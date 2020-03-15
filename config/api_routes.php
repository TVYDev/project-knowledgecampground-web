<?php
/**
 * Created by PhpStorm.
 * User: Vannyou TANG
 * Date: 31-Mar-19
 * Time: 4:56 PM
 */

$host = env('KC_API_HOST');

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
        'verify_authentication' => [
            'method'=> 'get',
            'path'  => '/api/auth/verify-authentication',
            'url'   => $host.'/api/auth/verify-authentication'
        ],
        'refresh_token' => [
            'method'=> 'post',
            'path'  => '/api/auth/refresh-token',
            'url'   => $host.'/api/auth/refresh-token'
        ],
        'permissions' => [
            'method'=> 'get',
            'path'  => '/api/auth/user-permissions',
            'url'   => $host.'/api/auth/user-permissions'
        ],
        'send_reset_email' => [
            'method'=> 'post',
            'path'  => '/api/auth/send-reset-email',
            'url'   => $host.'/api/auth/send-reset-email'
        ],
        'reset_password' => [
            'method'=> 'post',
            'path'  => '/api/auth/reset-password',
            'url'   => $host.'/api/auth/reset-password'
        ]
    ],
    'social_auth' => [
        'login' => [
            'method'    => 'get',
            'path'      => '/api/social-auth/login',
            'url'       => $host.'/api/social-auth/login'
        ]
    ],
    'user_profile' => [
        'update' => [
            'method'    => 'put',
            'path'      => '/api/user-profile/update',
            'url'       => $host.'/api/user-profile/update'
        ],
        'view' => [
            'method'    => 'get',
            'path'      => '/api/user-profile/view',
            'url'       => $host.'/api/user-profile/view'
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
            'path'  => '/api/question/description-of/{publicId}',
            'url'   => $host.'/api/question/description-of'
        ],
        'list' => [
            'method'=> 'get',
            'path'  => '/api/question/list',
            'url'   => $host.'/api/question/list'
        ],
        'get_subject_tags' => [
            'method'=> 'get',
            'path'  => '/api/question/get-subject-tags-of/{publicId}',
            'url'   => $host.'/api/question/get-subject-tags-of'
        ]
    ],
    'answer' => [
        'save'  =>  [
            'method'=> 'put',
            'path'  => '/api/answer/save/{publicId}',
            'url'   => $host.'/api/answer/save'
        ],
        'save_during_editing' => [
            'method' => 'post',
            'path'  => '/api/answer/save-during-editing',
            'url'   => $host.'/api/answer/save-during-editing'
        ],
        'view' => [
            'method'=> 'get',
            'path'  => '/api/answer/view/{publicId}',
            'url'   => $host.'/api/answer/view'
        ],
        'description' => [
            'method'=> 'get',
            'path'  => '/api/answer/description-of/{publicId}',
            'url'   => $host.'/api/answer/description-of'
        ],
        'list_posted_answers' => [
            'method'=> 'get',
            'path'  => '/api/answer/list-posted-answers-of/{questionPublicId}',
            'url'   => $host.'/api/answer/list-posted-answers-of'
        ]
    ],
    'comment' => [
        'save' => [
            'method'=> 'post',
            'path'  => '/api/comment/save',
            'url'   => $host.'/api/comment/save'
        ],
        'list_posted_comments' => [
            'method'=> 'get',
            'path'  => '/api/comment/list-posted-comments-of/{commentableType}/{commentablePublicId}',
            'url'   => $host.'/api/comment/list-posted-comments-of'
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
    ],
    'activity' => [
        'my_posts' => [
            'method' => 'get',
            'path'   => '/api/activity/my-posts',
            'url'    => $host.'/api/activity/my-posts'
        ]
    ]
];
