<?php

namespace LucianCaetano\TenantCore\Contracts;

use LucianCaetano\TenantCore\Repositories\PaginationConfig;

interface RepositoryInterface
{
    public function all($columns = array('*'));

    public function paginate($columns = array('*'), PaginationConfig $config);

    public function create(array $data);

    public function update(array $data, $id);

    public function delete($id);

    public function find($id, $columns = array('*'));

    public function findBy($field, $value, $columns = array('*'));
}
