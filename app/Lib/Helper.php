<?php


namespace App\Lib;


class Helper
{
    public static function getProp ($data, $prop, $default = null)
    {
        return isset($data->$prop) ? $data->$prop : $default;
    }

    public static function isValidJSONString ($jsonString)
    {
        json_decode($jsonString);
        return json_last_error() == JSON_ERROR_NONE;
    }
}
