<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 02-Apr-19
 * Time: 7:25 PM
 */

namespace App\Lib;


use App\Exceptions\KCValidationException;
use Illuminate\Support\Facades\Redirect;

trait ResponseEndPoint
{
    public function doResponseError (\Exception $exception, $redirectRouteForGeneralException,
                                     $isIncludedInputForGeneralException)
    {
        $redirectObj = null;
        if($exception instanceof KCValidationException)
        {
            $redirectObj = Redirect::route($exception->getRedirectedRoute())
                ->withErrors($exception->getValidatorObject());
            if($exception->isRedirectWithInput())
            {
                $redirectObj->withInput();
            }
        }
        else
        {
            $redirectObj = Redirect::route($redirectRouteForGeneralException)
                ->withFailure($this->getErrorMessage($exception, false));
            if($isIncludedInputForGeneralException)
            {
                $redirectObj->withInput();
            }
        }

        return $redirectObj;
    }

    public function doResponseSuccess ($redirectRoute, $message, $isIncludedInput)
    {
        $redirectObj = Redirect::route($redirectRoute)->withSuccess($message);

        if($isIncludedInput)
        {
            $redirectObj->withInput();
        }

        return $redirectObj;
    }
}