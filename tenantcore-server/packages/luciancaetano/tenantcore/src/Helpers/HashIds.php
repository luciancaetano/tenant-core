<?php


use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids as Hid;

if (!function_exists('hid_encode')) {
    /**
     * Encode using hashids
     *
     * @param int | Model $target
     * @return string | Model
     */
    function hid_encode($target)
    {
        $hashids = new Hid(config('tenantcore.hashids.key', env('HASHIDS_KEY')), 16);
        if($target instanceof Model){
            $target->incrementing = false;
            $target->{$target->getKeyName()}= $hashids->encode($target->getKey());
            return $target;
        }else{
            return $hashids->encode($target);
        }
    }
}

if (!function_exists('hid_decode')) {
    /**
     * Decode hashed id
     *
     * @param string | Model $target
     * @return int | Model
     */
    function hid_decode($target)
    {
        $hashids = new Hid(config('tenantcore.hashids.key', env('HASHIDS_KEY')), 16);
        if($target instanceof Illuminate\Database\Eloquent\Model){
            $decoded = $hashids->decode($target->getKey());
            $target->{$target->getKeyName()}= $decoded[0];
            $target->incrementing = true;
            return $target;
        }else{
            $decoded = $hashids->decode($target);
            return is_array($decoded) && sizeof($decoded) == 1 ? $decoded[0] : $decoded;
        }
    }
}
