<?php


namespace LucianCaetano\TenantCore\Traits;

/**
 * Trait CamelCase
 * @package LucianCaetano\TenantCore\Traits
 */
trait CamelCase
{

    /**
     * @return array
     */
    public function toArray()
    {
        $array = parent::toArray();
        $renamed = [];
        foreach ($array as $key => $value) {
            $renamed[camel_case($key)] = $value;
        }
        return $renamed;
    }

    /**
     * @param $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        $key = snake_case($key);
        return parent::getAttribute($key);
    }

    /**
     * @param $key
     * @param $value
     * @return mixed
     */
    public function setAttribute($key, $value)
    {
        $key = snake_case($key);
        return parent::setAttribute($key, $value);
    }

    /**
     * @param array $attributes
     * @param bool $dataIsInCamelCase
     * @return $this
     */
    public function fill(array $attributes, $dataIsInCamelCase = true)
    {
        if ($dataIsInCamelCase) {
            $newAttributes = [];
            foreach ($attributes as $key => $value) {
                $newAttributes[snake_case($key)] = $value;
            }
            return parent::fill($newAttributes);
        }

        return parent::fill($attributes);
    }

    /**
     * Convert attributes from camelCase to snake_case and fill them
     * @param array $attributes
     */
    public function camelFill(array $attributes)
    {
        $this->fill($attributes, true);
    }

    /**
     * Fill from snake_case dats
     * @param array $attributes
     */
    public function snakeFill(array $attributes)
    {
        $this->fill($attributes, false);
    }
}
