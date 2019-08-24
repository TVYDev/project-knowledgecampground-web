<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 24-Aug-19
 * Time: 11:29 AM
 */

namespace App\Http\Support;


use App\Lib\RequestAPI;

class UserAvatar
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
