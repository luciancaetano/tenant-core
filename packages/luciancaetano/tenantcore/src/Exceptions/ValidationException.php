<?php


namespace LucianCaetano\TenantCore\Exceptions;

use Throwable;

class ValidationException extends ApiException
{
    private $fields = [];
    protected $code = 400;

    public function __construct(array $fields, Throwable $previous = null)
    {
        $this->fields = $fields;
        parent::__construct("", 403, $previous);
    }

    public function toArray()
    {
        return $this->fields;
    }

    /**
     * @return array
     */
    public function getStackTrace()
    {
        return $this->fields;
    }

    public function getErrorType()
    {
        return 'ValidationException';
    }
}
