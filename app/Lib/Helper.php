<?php


namespace App\Lib;


class Helper
{
    public static function getProp ($data, $prop, $default = null)
    {
        return isset($data->$prop) ? $data->$prop : $default;
    }
}
