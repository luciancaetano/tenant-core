<?php

namespace LucianCaetano\TenantCore\Api;

use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\App;
use \Response;
use \Exception;
use Illuminate\Support\ServiceProvider;
use LucianCaetano\TenantCore\Exceptions\ApiException;
use LucianCaetano\TenantCore\Exceptions\ValidationException;

class RequestMacro extends ServiceProvider
{
    public static $HttpMessages = [
        100 => 'Continue',
        101 => 'Switching Protocols',
        102 => 'Processing',
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        207 => 'Multi-Status',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => 'Switch Proxy',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden / Insufficient Permissions',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        418 => 'I\'m a teapot',
        422 => 'Unprocessable Entity',
        423 => 'Locked',
        424 => 'Failed Dependency',
        425 => 'Unordered Collection',
        426 => 'Upgrade Required',
        449 => 'Retry With',
        450 => 'Blocked by Windows Parental Controls',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported',
        506 => 'Variant Also Negotiates',
        507 => 'Insufficient Storage',
        509 => 'Bandwidth Limit Exceeded',
        510 => 'Not Extended'
    ];

    /**
     *
     */
    public static function register()
    {
        Response::macro('Api', function ($data) {
            return RequestMacro::run($data);
        });
    }

    /**
     * @param $data
     * @return mixed
     */
    public static function run($data)
    {
        $res = new RestApiResponse();

        if ($data instanceof ValidationException) {
            $res
                ->setData(null)
                ->setError($data)
                ->setStatus($data->getCode())
                ->setMessage(isset(self::$HttpMessages[$data->getCode()]) ? self::$HttpMessages[$data->getCode()] : null)
                ->setMessage(null)
                ->setValidationErrors($data->getStackTrace())
                ->setErrorType('ApiValidationException'); // Fixed
        } elseif ($data instanceof ApiException || is_subclass_of($data, ApiException::class)) {
            $tableStatusCode = isset(self::$HttpMessages[$data->getCode()]) ? self::$HttpMessages[$data->getCode()] : null;
            $res
                ->setData(null)
                ->setValidationErrors(null)
                ->setError($data)
                ->setStatus($data->getCode())
                ->setMessage(strlen($data->getMessage()) > 0 ? $data->getMessage() : $tableStatusCode)
                ->setErrorType($data->getErrorType());
        } elseif ($data instanceof Exception || is_subclass_of($data, Exception::class)) {
            $tableStatusCode = isset(self::$HttpMessages[$data->getCode()]) ? self::$HttpMessages[$data->getCode()] : null;
            $res
                ->setData(null)
                ->setValidationErrors(null)
                // If is a basic exception then build visible result
                ->setError([
                    'message' => $data->getMessage(),
                    'type' => 'Exception',
                    'code' => $data->getCode(),
                    'trace' => App::isLocal() ? $data->getTrace() : []
                ])
                ->setStatus($data->getCode())
                ->setMessage(strlen($data->getMessage()) > 0 ? $data->getMessage() : $tableStatusCode)
                ->setErrorType(get_class($data));
        } elseif (is_subclass_of($data, Paginator::class)) {
            $paginationResult = new PaginationResponse();
            $paginationResult
                ->setTotal($data->total())
                ->setPerPage($data->perPage())
                ->setCurrentPage($data->currentPage())
                ->setLastPage($data->lastPage())
                ->setFrom($data->firstItem())
                ->setTo($data->lastItem());
            $res
                ->setPagination($paginationResult)
                ->setError(null)
                ->setValidationErrors(null)
                ->setMessage(self::$HttpMessages[200])
                ->setStatus(200)
                ->setData($data->toArray()['data']);
        } else {
            $res
                ->setPagination(null)
                ->setError(null)
                ->setValidationErrors(null)
                ->setMessage(self::$HttpMessages[200])
                ->setStatus(200)
                ->setData($data);
        }


        return Response::json($res->toArray(), $res->getStatus() >= 100 && $res->getStatus() <= 510 ? $res->getStatus() : 500);
    }
}
