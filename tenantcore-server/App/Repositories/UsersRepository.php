<?php


namespace App\Repositories;

use App\Models\User;
use LucianCaetano\TenantCore\Repositories\Repository;

class UsersRepository extends Repository
{

    /**
     * @return string
     */
    public function model()
    {
        return User::class;
    }
}
