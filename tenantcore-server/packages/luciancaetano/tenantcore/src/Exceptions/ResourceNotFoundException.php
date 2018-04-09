<?php


namespace LucianCaetano\TenantCore\Exceptions;

class ResourceNotFoundException extends ApiException
{
    protected $message = "Resource Not found";
    protected $code = 404;

    public function getErrorType()
    {
        return 'ResourceNotfoundException';
    }
}
