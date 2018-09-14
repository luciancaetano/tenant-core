<?php


namespace LucianCaetano\TenantCore\Traits;

use Illuminate\Support\Facades\Hash;

/**
 * Trait HashPassword
 * @package LucianCaetano\TenantCore\Traits
 */
trait HashPassword
{
    /**
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
