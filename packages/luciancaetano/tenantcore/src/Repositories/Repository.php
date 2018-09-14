<?php

namespace LucianCaetano\TenantCore\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Container\Container as App;

use LucianCaetano\TenantCore\Exceptions\CannotUpdateResourceException;
use LucianCaetano\TenantCore\Exceptions\ResourceNotFoundException;
use LucianCaetano\TenantCore\Exceptions\ValidationException;
use LucianCaetano\TenantCore\Contracts\RepositoryInterface;
use LucianCaetano\TenantCore\Criteria\Criteria;
use LucianCaetano\TenantCore\Contracts\CriteriaInterface;
use LucianCaetano\TenantCore\Exceptions\RepositoryException;
use LucianCaetano\TenantCore\Models\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class Repository
 * @package LucianCaetano\TenantCore\Repositories
 */
abstract class Repository implements RepositoryInterface, CriteriaInterface
{
    /**
     * @var App
     */
    protected $app;
    /**
     * Used by paginate to protect from sql errors
     * @var array
     */
    protected $odenableFields = ['id'];
    /**
     * Used by paginate to search on fields
     * @var array
     */
    protected $searchableFields = ['id'];
    /**
     * @var Collection
     */
    protected $criteria;
    /**
     * @var bool
     */
    protected $skipCriteria = false;
    /**
     * @var Model
     */
    protected $model;

    /**
     * Repository constructor.
     * @param App $app
     * @param Collection $collection
     */
    public function __construct(App $app, Collection $collection)
    {
        $this->app = $app;
        $this->criteria = $collection;
        $this->resetScope();
        $this->makeModel();
    }

    /**
     * @return $this
     */
    public function resetScope()
    {
        $this->skipCriteria(false);
        return $this;
    }

    /**
     * @param bool $status
     * @return $this
     */
    public function skipCriteria($status = true)
    {
        $this->skipCriteria = $status;
        return $this;
    }

    /**
     * @return mixed
     * @throws RepositoryException
     */
    public function makeModel()
    {
        $model = $this->app->make($this->model());

        if (!$model instanceof Model && !$model instanceof Authenticatable) {
            throw new RepositoryException("Class {$this->model()} must be an instance of ".Model::class.' or '.Authenticatable::class);
        }
        return $this->model = $model->newQuery();
    }

    /**
     * @return string
     */
    abstract public function model();

    /**
     * @param array $columns
     * @return mixed
     */
    public function all($columns = array('*'))
    {
        $this->applyCriteria();
        return $this->model->get($columns);
    }

    /**
     * @return $this
     */
    public function applyCriteria()
    {
        if ($this->skipCriteria === true) {
            return $this;
        }

        foreach ($this->getCriteria() as $criteria) {
            if ($criteria instanceof Criteria) {
                $this->model = $criteria->apply($this->model, $this);
            }
        }

        return $this;
    }

    /**
     * @return Collection
     */
    public function getCriteria()
    {
        return $this->criteria;
    }

    /**
     * @param array $columns
     * @param PaginationConfig $config
     * @return mixed
     */
    public function paginate($columns = array('*'), PaginationConfig $config)
    {
        $this->applyCriteria();

        $query = $this->model;

        if ($config->getSearch()) {
            $query = $query->where(function ($query) use ($config) {
                if (sizeof($this->searchableFields) > 0) {
                    $field = $this->searchableFields[0];
                    $q = $query->where($field, 'LIKE', '%'.$config->getSearch().'%');
                    for ($i = 1; $i < sizeof($this->searchableFields); $i++) {
                        $field = $this->searchableFields[$i];
                        $q = $query->where($field, 'LIKE', '%'.$config->getSearch().'%');
                    }
                }
            });
        }

        if ($config->getOrderBy()) {
            $query = $query->orderBy($config->getOrderBy(), $config->getOrderDir());
        }
        $result = $query->paginate($config->getPerPage(), $columns);
        return $result;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * @param array $data
     * @param $id
     * @param string $pk
     * @return mixed
     */
    public function update(array $data, $id, $pk = "id")
    {
        $model = $this->model->where($pk, '=', $id)->first();
        $model->fill($data);

        if (!$model->save()) {
            return new CannotUpdateResourceException();
        }

        return $model;
    }

    /**
     * @param $id
     * @return ResourceNotFoundException
     */
    public function delete($id)
    {
        $found = $this->model->find($id);
        if (!$found) {
            return new ResourceNotFoundException();
        }
        return $this->model->find($id)->limit(1)->delete();
    }

    /**
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function find($id, $columns = array('*'))
    {
        $this->applyCriteria();
        $found = $this->model->find($id, $columns);
        if (!$found) {
            return new ResourceNotFoundException();
        }
        return $found;
    }

    /**
     * @param $attribute
     * @param $value
     * @param array $columns
     * @return mixed
     */
    public function findBy($attribute, $value, $columns = array('*'))
    {
        $this->applyCriteria();
        return $this->model->where($attribute, '=', $value)->first($columns);
    }

    /**
     * @param Criteria $criteria
     * @return $this
     */
    public function getByCriteria(Criteria $criteria)
    {
        $this->model = $criteria->apply($this->model, $this);
        return $this;
    }

    /**
     * @param Criteria $criteria
     * @return $this
     */
    public function pushCriteria(Criteria $criteria)
    {
        $this->criteria->push($criteria);
        return $this;
    }
}
