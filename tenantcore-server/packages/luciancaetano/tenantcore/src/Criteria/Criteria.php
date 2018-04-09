<?php
namespace LucianCaetano\TenantCore\Criteria;

use LucianCaetano\TenantCore\Models\Model;
use LucianCaetano\TenantCore\Repositories\Repository;

abstract class Criteria
{
    abstract public function apply(Model $model, Repository $repository);
}
