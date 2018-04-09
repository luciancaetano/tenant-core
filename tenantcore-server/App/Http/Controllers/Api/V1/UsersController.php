<?php


namespace App\Http\Controllers\Api\V1;

use App\Services\UsersService;
use LucianCaetano\TenantCore\Controllers\ApiController;

class UsersController extends ApiController
{
    /**
     * @var UsersService
     */
    protected $service;

    public function __construct(UsersService $service)
    {
        $this->service = $service;
    }
}
