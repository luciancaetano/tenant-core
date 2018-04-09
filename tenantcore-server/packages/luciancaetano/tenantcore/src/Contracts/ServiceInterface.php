<?php


namespace LucianCaetano\TenantCore\Contracts;

use Illuminate\Http\Request;

interface ServiceInterface
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function all(Request $request);

    /**
     * @param Request $request
     * @return mixed
     */
    public function paginate(Request $request);

    /**
     * @param Request $request
     * @return mixed
     */
    public function create(Request $request);

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id);

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function delete(Request $request, $id);

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function find(Request $request, $id);
}
