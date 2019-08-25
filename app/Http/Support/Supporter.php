<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 24-Aug-19
 * Time: 12:09 PM
 */

namespace App\Http\Support;


use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;

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
}
