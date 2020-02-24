<?php


namespace App\Http\Support;


use App\Lib\RequestAPI;
use App\Lib\SessionConstants;

class Permission
{
    use RequestAPI;

    const CAN_CHANGE_PASSWORD = 'CAN_CHANGE_PASSWORD';

    public static function can ($permission)
    {
        $permissionsFromSession = session(SessionConstants::USER_PERMISSIONS);
        if (isset($permissionsFromSession) && count($permissionsFromSession) > 0) {
            if(in_array($permission, $permissionsFromSession)) {
                return true;
            }
        }
        return false;
    }

    public function getPermissions ()
    {
        $tmpPermissions = [];
        try {
            $response = $this->get(
                $this->getApiRequestUrl('user.permissions'),
                null,
                null,
                $this->getAuthorizationHeader());

            if($response->success == true) {
                $tmpPermissions = array_column($response->data, 'name');
            }
        }
        catch(\Exception $exception) {
            // TODO: Add log
        }
        return $tmpPermissions;
    }
}
