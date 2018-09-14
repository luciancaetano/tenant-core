<?php

namespace LucianCaetano\TenantCore\Services;

use Illuminate\Http\Request;
use LucianCaetano\TenantCore\Contracts\ServiceInterface;
use LucianCaetano\TenantCore\Repositories\PaginationConfig;
use LucianCaetano\TenantCore\Repositories\Repository;
use Illuminate\Container\Container;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use LucianCaetano\TenantCore\Models\Model;

abstract class Service implements ServiceInterface
{
    /**
     * @var Repository
     */
    protected $repository;
    /**
     * @var Container
     */
    protected $app;

    /**
     * @param Request $request
     * @return mixed
     */
    public function all(Request $request)
    {
        return $this->repository->create($request->all());
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function paginate(Request $request)
    {
        return $this->repository->paginate(['*'], PaginationConfig::fromRequest($request));
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function create(Request $request)
    {
        return $this->repository->create($request->all());
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        return $this->repository->update($request->all(), $id);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function delete(Request $request, $id)
    {
        return $this->repository->delete($id);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function find(Request $request, $id)
    {
        return $this->repository->find($id);
    }
    /**
     * Get the getAuthenticatedUser or return null
     *
     * @return null|Model
     */
    public function getAuthenticatedUser(){
        try{
            return JWTAuth::parseToken()->authenticate();
        }catch(JWTException $e){
            return null;
        }
    }
}
