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
            $validatorObj = $exception->getValidatorObject();
            $errorMessage = implode('|',$validatorObj->errors()->all());

            KCLog::error($errorMessage);

            $redirectObj = Redirect::route($exception->getRedirectedRoute())
                ->withErrors($validatorObj);
            if($exception->isRedirectWithInput())
            {
                $redirectObj->withInput();
            }
        }
        else
        {
            $errorMessage = $this->getErrorMessage($exception, false);

            KCLog::error($errorMessage);

            $redirectObj = Redirect::route($redirectRouteForGeneralException)
                ->withFailure($errorMessage);
            if($isIncludedInputForGeneralException)
            {
                $redirectObj->withInput();
            }
        }

        return $redirectObj;
    }

    public function doResponseSuccess ($redirectRoute, $message, $isIncludedInput)
    {
        KCLog::info($message);

        $redirectObj = Redirect::route($redirectRoute)->withSuccess($message);

        if($isIncludedInput)
        {
            $redirectObj->withInput();
        }

        return $redirectObj;
    }
}