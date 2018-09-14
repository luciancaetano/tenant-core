<?php


namespace LucianCaetano\TenantCore\Validation;

use Illuminate\Contracts\Validation\Validator;
use LucianCaetano\TenantCore\Exceptions\ValidationException;
use Illuminate\Support\MessageBag;

/**
 * Class ValidationResult
 * @package LucianCaetano\TenantCore\Validation
 */
class ValidationResult
{
    /**
     * @var Validator
     */
    protected $validator;
    /**
     * @var array
     */
    protected $rules;
    /**
     * @var bool
     */
    protected $valid;
    /**
     * @var bool
     */
    protected $useCamelCase;

    /**
     * ValidationResult constructor.
     * @param Validator $validator
     * @param $rules
     * @param $useCamelCase
     */
    public function __construct(Validator $validator, $rules, $useCamelCase)
    {
        $this->validator = $validator;
        $this->rules = $rules;
        $this->valid = !$this->validator->fails();
        $this->useCamelCase = $useCamelCase;
    }

    /**
     * @return bool|ValidationException
     */
    public function toException()
    {
        $fields = [];
        $messages = [];
        if (!$this->isValid()) {
            // List Errors Messages
            foreach ($this->validator->errors()->toArray() as $field => $message) {
                $messages[$field] = $message;
            }
            // List Validation Rules
            foreach ($this->validator->failed() as $field => $validators) {
                $message = isset($messages[$field]) ? $messages[$field] : [];
                $fields[] = [
                    'field' => $this->useCamelCase ? camel_case($field) : $field,
                    'message' => $message,
                    'validators' => $validators
                ];
            }
            clock($fields);
            return new ValidationException($fields);
        } else {
            return null;
        }
    }

    /**
     * @return MessageBag
     */
    public function toMessageBag()
    {
        return new MessageBag($this->toArray());
    }

    /**
     * @return array
     */
    public function toArray()
    {
        if ($this->useCamelCase) {
            $data = [];
            foreach ($this->validator->errors()->toArray() as $key => $value) {
                $data[camel_case($key)] = $value;
            }
            return $data;
        }
        return $this->validator->errors()->toArray();
    }

    /**
     * @return bool
     */
    public function isValid()
    {
        return $this->valid;
    }
}
