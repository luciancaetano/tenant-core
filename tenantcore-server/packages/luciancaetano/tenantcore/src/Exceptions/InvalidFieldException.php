<?php


namespace LucianCaetano\TenantCore\Exceptions;

use Throwable;

class InvalidFieldException extends ApiException
{
    protected $code = 400;
    protected $messages;
    protected $validator;
    protected $field;
    /**
     * InvalidFieldException constructor.
     * @param string $field
     * @param array $messages
     * @param array $validator
     * @param Throwable|null $previous
     */
    public function __construct($field, $messages = [], $validator, Throwable $previous = null)
    {
        $this->field = $field;
        $this->messages = $messages;
        $this->validator = $validator;
        parent::__construct("", $this->code, $previous);
    }

    public function toArray()
    {
        return [
            'field' => $this->field,
            'messages' => $this->messages,
            'validator' => $this->validator
        ];
    }

    public function getErrorType()
    {
        return 'InvalidFieldException';
    }
}
