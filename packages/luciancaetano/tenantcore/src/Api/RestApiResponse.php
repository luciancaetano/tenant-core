<?php


namespace LucianCaetano\TenantCore\Api;

use LucianCaetano\TenantCore\Exceptions\ApiException;
use LucianCaetano\TenantCore\Exceptions\ValidationException;
use Mockery\Exception;

class RestApiResponse
{
    /**
     * @var int
     */
    private $status;
    /**
     * @var string
     */
    private $message;
    /**
     * @var mixed
     */
    private $data;
    /**
     * @var ApiException
     */
    private $error;
    /**
     * @var string
     */
    private $errorType;
    /**
     * @var array
     */
    private $validationErrors;
    /**
     * @var PaginationResponse
     */
    private $pagination;

    /**
     * @return array
     */
    public function toArray()
    {
        $result = [
            'status' => $this->getStatus() ? (int)$this->getStatus() : 200,
            'message' => $this->getMessage() ? $this->getMessage() : null,
            'data' => $this->getData(),
            'errorType' => $this->getErrorType() ? $this->getErrorType() : null,
            'pagination' => $this->getPagination() ? $this->getPagination()->toArray() : null,
            'validationErrors' => $this->getValidationErrors() ? $this->getValidationErrors() : null,
            'error' => $this->getError() ? $this->getError() : null
        ];
        $result['error'] = method_exists($this->getError(), 'toArray') ?  $this->getError()->toArray() :  $result['error'];
        $result['validationErrors'] = method_exists($this->getError(), 'toArray') ?  $this->getError()->toArray() :  $result['validationErrors'];
        return $result;
    }

    /**
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }

    /**
     * @param array $validationErrors
     * @return RestApiResponse
     */
    public function setValidationErrors($validationErrors)
    {
        $this->validationErrors = $validationErrors;
        return $this;
    }

    /**
     * @return string
     */
    public function getErrorType()
    {
        return $this->errorType;
    }

    /**
     * @param string $errorType
     * @return RestApiResponse
     */
    public function setErrorType($errorType)
    {
        $this->errorType = $errorType;
        return $this;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     * @return RestApiResponse
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     * @return RestApiResponse
     */
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        if(is_array($this->data)){
            return $this->data ? $this->data : [];
        }else{
            return $this->data ? $this->data : null;
        }
    }

    /**
     * @param mixed $data
     * @return RestApiResponse
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * @return ApiException
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * @param ApiException | array $error
     * @return RestApiResponse
     */
    public function setError($error)
    {
        $this->error = $error;
        return $this;
    }

    /**
     * @return PaginationResponse
     */
    public function getPagination()
    {
        return $this->pagination;
    }

    /**
     * @param PaginationResponse $pagination
     * @return RestApiResponse
     */
    public function setPagination($pagination)
    {
        $this->pagination = $pagination;
        return $this;
    }
}
