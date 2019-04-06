<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 06-Apr-19
 * Time: 7:01 AM
 */

namespace App\Lib;


use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;

class KCLog
{
    /*******************************************************
     * Log Level
     ******************************************************/
    const DEBUG     = 'debug';
    const INFO      = 'info';
    const ERROR     = 'error';
    /******************************************************/

    public static function log ($logLevel, $message)
    {
        // --- prepare data for using in the log
        $path = $_SERVER['PATH_INFO']; // path of request
        $fromRemote = $_SERVER['REMOTE_ADDR'].':'.$_SERVER['REMOTE_PORT']; // IP address of request
        $inputs = Input::all(); // inputs of request
        $filteredInputs = array_filter($inputs, function($key) { // exclude password from log data
            return strpos($key, 'password') === false;
        }, ARRAY_FILTER_USE_KEY);

        // --- structure data for logging
        $context = [
            $path,
            $fromRemote,
            count($filteredInputs) > 0 ? json_encode($filteredInputs) : null
        ];

        switch ($logLevel)
        {
            case self::DEBUG:
                Log::debug($message, $context);
                break;
            case self::INFO:
                Log::info($message, $context);
                break;
            case self::ERROR:
                Log::error($message, $context);
                break;
            default: break;
        }
    }

    public static function debug($message)  {self::log(self::DEBUG, $message);}
    public static function info($message)   {self::log(self::INFO, $message);}
    public static function error($message)  {self::log(self::ERROR, $message);}
}