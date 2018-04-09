<?php

namespace App\Services;

use App\Repositories\UsersRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use LucianCaetano\TenantCore\Services\Service;
use LucianCaetano\TenantCore\Validation\FlowValidator;

/**
 * Class UsersService
 * @package App\Services
 */
class UsersService extends Service
{
    /**
     * UsersService constructor.
     * @param UsersRepository $repository
     */
    public function __construct(UsersRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return bool|\LucianCaetano\TenantCore\Exceptions\ValidationException|mixed
     */
    public function create(Request $request)
    {
        $validator = FluentValidator::Make($request->all())
            ->add('name')
            ->between(4, 255)
            ->required()
            ->add('email')
            ->unique(Rule::unique('users', 'email'))
            ->between(4, 255)
            ->required()
            ->add('password')
            ->between(4, 255)
            ->required()
            ->validate();

        if (!$validator->isValid()) {
            return $validator->toException();
        }

        return parent::create($request);
    }

    /**
     * @param Request $request
     * @param $id
     * @return bool|\LucianCaetano\TenantCore\Exceptions\ValidationException|mixed
     */
    public function update(Request $request, $id)
    {
        $validator = FluentValidator::Make($request->all())
            ->add('name')
            ->between(4, 255)
            ->add('email')
            ->unique(Rule::unique('users', 'email'))
            ->between(4, 255)
            ->add('password')
            ->between(4, 255)
            ->validate();

        if (!$validator->isValid()) {
            return $validator->toException();
        }

        return parent::update($request, $id);
    }
    
    /**
     * @param Request $request
     * @return mixed
     */
    public function find(Request $request, $id)
    {
        return hid_encode($this->repository->find($id));
    }
}
