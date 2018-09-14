<?php


namespace LucianCaetano\TenantCore\Exceptions;

class CannotUpdateResourceException extends ApiException
{
    protected $message = "Cannot update Resource";
    protected $code = 400;

    public function getErrorType()
    {
        return 'CannotUpdateResourceException';
    }
}
