<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 06-Apr-19
 * Time: 6:45 AM
 */

namespace App\Http\ViewModels;


use App\Lib\RequestAPI;

class UserAvatarViewModel
{
    use RequestAPI;

    public function getUserAvatar()
    {
        // --- call API to request get user_avatar of the user
        $responseUserAvatar = $this->get($this->getApiRequestUrl('user.get_user_avatar'),null,[
            'Authorization' => $this->getAccessToken()
        ]);

        return $responseUserAvatar;
    }
}