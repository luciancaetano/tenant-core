<?php


namespace LucianCaetano\TenantCore\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use LucianCaetano\TenantCore\Exceptions\ApiException;
use LucianCaetano\TenantCore\Services\Service;

abstract class ApiController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    /**
     * @var Service
     */
    protected $service;
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Response::Api($this->service->paginate($request));
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws ApiException
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        return Response::Api($this->service->create($request));
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function show($id, Request $request)
    {
        return Response::Api($this->service->find($request, $id));
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     * @throws ApiException
     * @throws ValidationException
     */
    public function update($id, Request $request)
    {
        return Response::Api($this->service->update($request, $id));
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function destroy($id, Request $request)
    {
        return Response::Api($this->service->delete($request, $id));
    }
}
