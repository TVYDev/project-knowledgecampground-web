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
    const EMERGENCY = 'emergency';
    const ALERT     = 'alert';
    const CRITICAL  = 'critical';
    const ERROR     = 'error';
    const WARNING   = 'warning';
    const NOTICE    = 'notice';
    const INFO      = 'info';
    const DEBUG     = 'debug';
    /******************************************************/

    public static function log ($logLevel, $message)
    {
        // --- prepare data for using in the log
        $path = $_SERVER['PATH_INFO']; // path of request
        $fromRemote = $_SERVER['REMOTE_ADDR'].':'.$_SERVER['REMOTE_PORT']; // IP address of request
        $inputs = Input::all(); // inputs of request
        $filteredInputs = array_filter($inputs, function($key) { // exclude password from log data
            if($key == '_token' || strpos($key,'password') !== false){
                return false;
            }
            return true;
        }, ARRAY_FILTER_USE_KEY);

        // --- structure data for logging
        $context = [
            $path,
            $fromRemote,
            count($filteredInputs) > 0 ? json_encode($filteredInputs) : null
        ];

        switch ($logLevel)
        {
            case self::EMERGENCY:
                Log::emergency($message, $context);
                break;
            case self::ALERT:
                Log::alert($message, $context);
                break;
            case self::CRITICAL:
                Log::critical($message, $context);
                break;
            case self::ERROR:
                Log::error($message, $context);
                break;
            case self::WARNING:
                Log::warning($message, $context);
                break;
            case self::NOTICE:
                Log::notice($message, $context);
                break;
            case self::INFO:
                Log::info($message, $context);
                break;
            case self::DEBUG:
                Log::debug($message, $context);
                break;
            default:
                Log::debug($message, $context);
                break;
        }
    }

    public static function emergency($message)  {self::log(self::EMERGENCY, $message);}
    public static function alert($message)      {self::log(self::ALERT, $message);}
    public static function critical($message)   {self::log(self::CRITICAL, $message);}
    public static function error($message)      {self::log(self::ERROR, $message);}
    public static function warning($message)    {self::log(self::WARNING, $message);}
    public static function notice($message)     {self::log(self::NOTICE, $message);}
    public static function info($message)       {self::log(self::INFO, $message);}
    public static function debug($message)      {self::log(self::DEBUG, $message);}
}