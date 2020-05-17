<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 24-Aug-19
 * Time: 12:09 PM
 */

namespace App\Http\Support;


use App\Lib\Helper;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\SessionConstants;

class Supporter
{
    use RequestAPI, ResponseEndPoint;

    public function doGeneratePublicId()
    {
        try
        {
            $response = $this->get($this->getApiRequestUrl('support.generate_public_id'), null,null, $this->getAuthorizationHeader());

            if($response->success == true){
                return $response->data->public_id;
            }
            return null;
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError($exception, false);
        }
    }

    public function decodeBase64StringToImageFile ($str)
    {
        try
        {
            $matches = null;
            preg_match('/data:image\\/(.*);base64,(.*)/', $str, $matches);
            $file = base64_decode($matches[2]);
            return [
                'file' => $file,
                'extension' => $matches[1]
            ];
        }
        catch(\Exception $exception)
        {
            return null;
        }
    }

    public function saveUserPermissionsToSession () {
        try {
            $permissions = (new Permission())->getPermissions();
            session([SessionConstants::USER_PERMISSIONS => $permissions]);
        }
        catch(\Exception $exception) {
            // TODO: add log
            return null;
        }
    }

    /*
     * Currently save:
     * username
     * avatar_url
     */
    public function saveCommonUserInfoToSession () {
        try {
            $response = $this->get($this->getApiRequestUrl('user_profile.view'),null, null, $this->getAuthorizationHeader());
            if($response->success == true) {
                $data = Helper::getProp($response, 'data');
                if(isset($data)) {
                    $this->saveUserPublicIdToSession(Helper::getProp($data, 'public_id'));
                    $this->saveUsernameToSession(Helper::getProp($data, 'username'));
                    $this->saveAvatarUrlToSession(Helper::getProp($data, 'avatar_url'));
                    $this->saveAvatarUrlJdenticonToSession(Helper::getProp($data, 'avatar_url_jdenticon'));
                }
            }
            throw new \UnexpectedValueException('Unable to get user profile');
        }catch(\Exception $exception) {
            // TODO:
            return null;
        }
    }

    public function saveUserPublicIdToSession ($publicId) {
        session([SessionConstants::USER_PUBLIC_ID => $publicId]);
    }

    public function saveAvatarUrlToSession ($avatarUrl) {
        session([SessionConstants::USER_AVATAR_URL => $avatarUrl]);
    }

    public function saveAvatarUrlJdenticonToSession ($jdenticon) {
        session([SessionConstants::USER_AVATAR_URL_JDENTICON => $jdenticon]);
    }

    public function saveUsernameToSession ($username) {
        session([SessionConstants::USER_NAME => $username]);
    }

}
