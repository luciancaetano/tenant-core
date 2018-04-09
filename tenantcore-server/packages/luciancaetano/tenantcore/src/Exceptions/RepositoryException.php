<?php

namespace LucianCaetano\TenantCore\Exceptions;

use Exception;
use Throwable;

class RepositoryException extends Exception
{
    protected $code = 500;
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
