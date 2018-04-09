<?php


namespace LucianCaetano\TenantCore\Validation;

use Illuminate\Support\Facades\Validator;

/**
 * Class FlowValidator
 * @package LucianCaetano\TenantCore\Validation
 */
class FlowValidator
{
    /**
     * @var array
     */
    protected $rules;
    /**
     * @var mixed
     */
    protected $data;
    /**
     * @var bool
     */
    protected $useCamelCase;

    /**
     * FlowValidator constructor.
     * @param $data
     * @param bool $useCamelCase
     */
    private function __construct($data, $useCamelCase = true)
    {
        $this->rules = [];
        $this->data = $data;
        $this->useCamelCase = $useCamelCase;
    }

    /**
     * @param $data
     * @param bool $useCamelCase
     * @return FlowValidator
     */
    public static function Make($data, $useCamelCase = true)
    {
        return new FlowValidator($data, $useCamelCase);
    }

    /**
     * Push a Field
     * @param $field
     * @return ChainFieldRules
     */
    public function add($field)
    {
        return new ChainFieldRules($field, $this);
    }

    /**
     * @param $field
     * @param $rules
     * @return $this
     */
    public function setRulesToField($field, $rules)
    {
        if (!isset($this->stack[$field])) {
            $this->rules[$field] = $rules;
        } else {
            $this->rules[$field] .= '|' . $rules;
        }
        return $this;
    }

    /**
     * @return ValidationResult
     */
    public function validate()
    {
        if ($this->useCamelCase) {
            $data = [];
            foreach ($this->data as $key => $value) {
                $data[camel_case($key)] = $value;
            }

            $rules = [];
            foreach ($this->rules as $key => $value) {
                $rules[camel_case($key)] = $value;
            }
            return new ValidationResult(Validator::make($data, $rules), $rules, $this->useCamelCase);
        }
        return new ValidationResult(Validator::make($this->data, $this->rules), $this->rules, $this->useCamelCase);
    }
}
