<?php


namespace LucianCaetano\TenantCore\Exceptions;

use Exception;
use Illuminate\Support\Facades\App;
use Throwable;

abstract class ApiException extends Exception
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    abstract public function getErrorType();

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'message' => $this->getMessage(),
            'type' => $this->getErrorType(),
            'code' => $this->getCode(),
            'trace' => App::isLocal() ? $this->getTrace() : []
        ];
    }
}
