<?php


namespace LucianCaetano\TenantCore\Validation;

use Illuminate\Validation\Rules\Dimensions;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Validation\Rules\In;
use Illuminate\Validation\Rules\NotIn;
use Illuminate\Validation\Rules\Unique;

/**
 * Class ChainFieldRules
 * @package LucianCaetano\TenantCore\Validation
 */
class ChainFieldRules
{
    /**
     * @var array
     */
    protected $rules;
    /**
     * @var
     */
    protected $field;
    /**
     * @var FlowValidator
     */
    protected $owner;

    public function __construct($field, FlowValidator $owner)
    {
        $this->rules = [];
        $this->field = $field;
        $this->owner = $owner;
    }

    /**
     * Back to StackValidator and return new ChainFieldRules
     * @param $field
     * @return ChainFieldRules
     */
    public function add($field)
    {
        return $this->toValidator()->add($field);
    }

    /**
     * Back to StackValidator
     * @return FlowValidator
     */
    public function toValidator()
    {
        $rules = implode('|', $this->rules);
        return $this->owner->setRulesToField($this->field, $rules);
    }

    /**
     * @return ValidationResult
     */
    public function validate()
    {
        return $this->toValidator()->validate();
    }

    /**
     * The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance
     * @return $this
     */
    public function accepted()
    {
        $this->rules[] = 'accepted';
        return $this;
    }

    /**
     * The field under validation must have a valid A or AAAA record according to the  dns_get_record PHP function.
     * @return $this
     */
    public function active_url()
    {
        $this->rules[] = 'active_url';
        return $this;
    }

    /**
     * The field under validation must be a value after a given date. The dates will be passed into the  strtotime PHP function:
     * @param $date string
     * @return $this
     */
    public function after($date)
    {
        $this->rules[] = 'after:' . $date;
        return $this;
    }

    /**
     * The field under validation must be a value after or equal to the given date. For more information, see the after rule.
     * @param $date string
     * @return $this
     */
    public function afterOrEqual($date)
    {
        $this->rules[] = 'after_or_equal:' . $date;
        return $this;
    }

    /**
     * The field under validation must be entirely alphabetic characters.
     * @return $this
     */
    public function alpha()
    {
        $this->rules[] = 'alpha';
        return $this;
    }

    /**
     * The field under validation may have alpha-numeric characters, as well as dashes and underscores.
     * @return $this
     */
    public function alphaDash()
    {
        $this->rules[] = 'alpha_dash';
        return $this;
    }

    /**
     * The field under validation must be entirely alpha-numeric characters.
     * @return $this
     */
    public function alphaNum()
    {
        $this->rules[] = 'alpha_num';
        return $this;
    }

    /**
     * The field under validation must be a PHP array.
     * @return $this
     */
    public function isArray()
    {
        $this->rules[] = 'array';
        return $this;
    }

    /**
     * The field under validation must be a value preceding the given date.
     * The dates will be passed into the PHP strtotime function.
     * @param $date
     * @return $this
     */
    public function before($date)
    {
        $this->rules[] = 'before:' . $date;
        return $this;
    }

    /**
     * The field under validation must be a value preceding or equal to the given date.
     * The dates will be passed into the PHP strtotime function.
     * @param $date
     * @return $this
     */
    public function beforeOrEqual($date)
    {
        $this->rules[] = 'before_or_equal:' . $date;
        return $this;
    }

    /**
     * The field under validation must have a size between the given min and max.
     * Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.
     * @param $min int | float | double
     * @param $max int | float | double
     * @return $this
     */
    public function between($min, $max)
    {
        $this->rules[] = 'between:' . $min . ',' . $max;
        return $this;
    }

    /**
     * The field under validation must be able to be cast as a boolean. Accepted input are true,  false, 1, 0, "1", and "0".
     * @return $this
     */
    public function boolean()
    {
        $this->rules[] = 'boolean';
        return $this;
    }

    /**
     * The field under validation must have a matching field of foo_confirmation.
     * For example, if the field under validation is password, a matching password_confirmation
     * field must be present in the input.
     * @return $this
     */
    public function confirmed()
    {
        $this->rules[] = 'confirmed';
        return $this;
    }

    /**
     * The field under validation must be a valid date according to the strtotime PHP function.
     * @return $this
     */
    public function date()
    {
        $this->rules[] = 'date';
        return $this;
    }

    /**
     * The field under validation must be equal to the given date.
     * The dates will be passed into the PHP strtotime function.
     * @param $date
     * @return $this
     */
    public function dateEquals($date)
    {
        $this->rules[] = 'date_equals:' . $date;
        return $this;
    }

    /**
     * The field under validation must have a different value than field.
     * @param $field
     * @return $this
     */
    public function different($field)
    {
        $this->rules[] = 'different:' . $field;
        return $this;
    }

    /**
     * The field under validation must be numeric and must have an exact length of value.
     * @param $value
     * @return $this
     */
    public function digits($value)
    {
        $this->rules[] = 'digits:' . $value;
        return $this;
    }

    /**
     * The field under validation must have a length between the given min and max.
     * @param $min
     * @param $max
     * @return $this
     */
    public function digitsBetween($min, $max)
    {
        $this->rules[] = 'digits_between:' . $min . ',' . $max;
        return $this;
    }

    /**
     * The file under validation must be an image meeting the dimension constraints as specified by the rule's parameters:
     * @param Dimensions $dimensions
     * @return $this
     */
    public function dimensions(Dimensions $dimensions)
    {
        $this->rules[] = '' . $dimensions->__toString();
        return $this;
    }

    /**
     * When working with arrays, the field under validation must not have any duplicate values.
     * @return $this
     */
    public function distinct()
    {
        $this->rules[] = 'distinct';
        return $this;
    }

    /**
     * The field under validation must be formatted as an e-mail address.
     * @return $this
     */
    public function email()
    {
        $this->rules[] = 'email';
        return $this;
    }

    /**
     * The field under validation must exist on a given database table.
     * Occasionally, you may need to specify a specific database connection to be used for the  exists query.
     * You can accomplish this by prepending the connection name to the table name using "dot" syntax:
     * @param array $rules
     * @return $this
     */
    public function exists($rules = [])
    {
        $this->rules[] = 'exists:' . implode(',', $rules);
        return $this;
    }

    /**
     * The field under validation must exist on a given database table.
     * If you would like to customize the query executed by the validation rule,
     * you may use the Rule class to fluently define the rule. In this example,
     * we'll also specify the validation rules as an array instead of using the | character to delimit them:
     * @param Exists $rules
     * @return $this
     */
    public function existsRule(Exists $rules)
    {
        $this->rules[] = '' . $rules->__toString();
        return $this;
    }

    /**
     * The field under validation must be a successfully uploaded file.
     * @return $this
     */
    public function file()
    {
        $this->rules[] = 'file';
        return $this;
    }

    /**
     * The field under validation must not be empty when it is present.
     * @return $this
     */
    public function filled()
    {
        $this->rules[] = 'filled';
        return $this;
    }

    public function __()
    {
        $this->rules[] = '__';
        return $this;
    }

    /**
     * The file under validation must be an image (jpeg, png, bmp, gif, or svg)
     * @return $this
     */
    public function image()
    {
        $this->rules[] = 'image';
        return $this;
    }

    /**
     * The field under validation must be included in the given list of values.
     * Since this rule often requires you to implode an array, the Rule::in
     * method may be used to fluently construct the rule:
     * @param In $rule
     * @return $this
     */
    public function in(In $rule)
    {
        $this->rules[] = '' . $rule->__toString();
        return $this;
    }

    /**
     * The field under validation must exist in anotherfield's values.
     * @param $anotherField
     * @return $this
     */
    public function inArray($anotherField)
    {
        $this->rules[] = 'in_array:' . $anotherField;
        return $this;
    }

    /**
     * The field under validation must be an integer.
     * @return $this
     */
    public function integer()
    {
        $this->rules[] = 'integer';
        return $this;
    }

    /**
     * The field under validation must be an IP address.
     * @return $this
     */
    public function ip()
    {
        $this->rules[] = 'ip';
        return $this;
    }

    /**
     * The field under validation must be an IPv4 address.
     * @return $this
     */
    public function ipv4()
    {
        $this->rules[] = 'ipv4';
        return $this;
    }

    /**
     * The field under validation must be an IPv6 address.
     * @return $this
     */
    public function ipv6()
    {
        $this->rules[] = 'ipv6';
        return $this;
    }

    /**
     * The field under validation must be a valid JSON string.
     * @return $this
     */
    public function json()
    {
        $this->rules[] = 'json';
        return $this;
    }

    /**
     * The field under validation must be less than or equal to a maximum value.
     * Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.
     * @param $value
     * @return $this
     */
    public function max($value)
    {
        $this->rules[] = 'max:' . $value;
        return $this;
    }

    /**
     * The file under validation must match one of the given MIME types:
     * @param array $mimes
     * @return $this
     */
    public function mimetypes($mimes = [])
    {
        $this->rules[] = 'mimetypes:' . implode(',', $mimes);
        return $this;
    }

    /**
     * The field under validation must have a minimum value.
     * Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.
     * @param $value
     * @return $this
     */
    public function min($value)
    {
        $this->rules[] = 'min:' . $value;
        return $this;
    }

    /**
     * The field under validation may be null. This is particularly useful when
     * validating primitive such as strings and integers that can contain null values.
     * @return $this
     */
    public function nullable()
    {
        $this->rules[] = 'nullable';
        return $this;
    }

    /**
     * The field under validation must not be included in the given list of values.
     * The Rule::notIn method may be used to fluently construct the rule:
     * @param NotIn $rules
     * @return $this
     */
    public function notIn(NotIn $rules)
    {
        $this->rules[] = '' . $rules->__toString();
        return $this;
    }

    /**
     * The field under validation must be numeric.
     * @return $this
     */
    public function numeric()
    {
        $this->rules[] = 'numeric';
        return $this;
    }

    /**
     * The field under validation must be present in the input data but can be empty.
     * @return $this
     */
    public function present()
    {
        $this->rules[] = 'present';
        return $this;
    }

    /**
     * The field under validation must match the given regular expression.
     * Note: When using the regex pattern, it may be necessary to specify
     * rules in an array instead of using pipe delimiters,
     * especially if the regular expression contains a pipe character.
     * @param $pattern
     * @return $this
     */
    public function regex($pattern)
    {
        $this->rules[] = 'regex:' . $pattern;
        return $this;
    }

    /**
     * The field under validation must be present in the input data and not empty.
     * A field is considered "empty" if one of the following conditions are true:
     * The value is null.
     * The value is an empty string.
     * The value is an empty array or empty Countable object.
     * The value is an uploaded file with no path.
     * @return $this
     */
    public function required()
    {
        $this->rules[] = 'required';
        return $this;
    }

    /**
     * The field under validation must be present and not empty if the anotherfield field is equal to any value.
     * @param $anotherfield
     * @param $value
     * @return $this
     */
    public function requiredIf($anotherfield, $value)
    {
        $this->rules[] = 'required_if:' . $anotherfield . ',' . $value;
        return $this;
    }

    /**
     * The field under validation must be present and not empty unless the anotherfield field is equal to any value.
     * @param $anotherfield
     * @param $value
     * @return $this
     */
    public function requiredUnless($anotherfield, $value)
    {
        $this->rules[] = 'required_if:' . $anotherfield . ',' . $value;
        return $this;
    }

    /**
     * @param array $fields
     * @return $this
     */
    public function requiredWith(array $fields)
    {
        $this->rules[] = 'required_with:' . implode(',', $fields);
        return $this;
    }

    /**
     * The field under validation must be present and not empty only if all of the other specified fields are present.
     * @param array $fields
     * @return $this
     */
    public function requiredWithAll(array $fields)
    {
        $this->rules[] = 'required_with_all:' . implode(',', $fields);
        return $this;
    }

    /**
     * The field under validation must be present and not empty only when any of the other specified fields are not present.
     * @param array $fields
     * @return $this
     */
    public function requiredWithout(array $fields)
    {
        $this->rules[] = 'required_without:' . implode(',', $fields);
        return $this;
    }

    /**
     * The field under validation must be present and not empty only when all of the other specified fields are not present.
     * @param array $fields
     * @return $this
     */
    public function requiredWithoutAll(array $fields)
    {
        $this->rules[] = 'required_without_all:' . implode(',', $fields);
        return $this;
    }

    /**
     * The given field must match the field under validation.
     * @param $field
     * @return $this
     */
    public function same($field)
    {
        $this->rules[] = 'same:' . $field;
        return $this;
    }

    /**
     * The field under validation must have a size matching the given value.
     * For string data, value corresponds to the number of characters.
     * For numeric data, value corresponds to a given integer value.
     * For an array, size corresponds to the count of the array.
     * For files, size corresponds to the file size in kilobytes.
     * @param $value
     * @return $this
     */
    public function size($value)
    {
        $this->rules[] = 'size:' . $value;
        return $this;
    }

    /**
     * The field under validation must be a string.
     * If you would like to allow the field to also be null, you should assign the nullable rule to the field.
     * @return $this
     */
    public function string()
    {
        $this->rules[] = 'string';
        return $this;
    }

    /**
     * The field under validation must be a valid timezone identifier according to the  timezone_identifiers_list PHP function.
     * @return $this
     */
    public function timezone()
    {
        $this->rules[] = 'timezone';
        return $this;
    }

    /**
     * The field under validation must be unique in a given database table.
     * If the column option is not specified, the field name will be used.
     * @param Unique $rules
     * @return $this
     */
    public function unique(Unique $rules)
    {
        $this->rules[] = "{$rules}";
        return $this;
    }
    /**
     * Add Custom Validator
     * @param $name
     * @param $value
     */
    public function custom($name, $value)
    {
        $this->rules[] = "{$name}:{$value}";
    }
}
