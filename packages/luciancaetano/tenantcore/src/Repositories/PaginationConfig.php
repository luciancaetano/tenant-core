<?php


namespace LucianCaetano\TenantCore\Repositories;

use Illuminate\Http\Request;

/**
 * Class PaginationConfig
 * @package LucianCaetano\TenantCore\Repositories
 */
class PaginationConfig
{
    /**
     * @var int
     */
    private $page;
    /**
     * @var int
     */
    private $perPage;
    /**
     * @var string
     */
    private $search;
    /**
     * @var string
     */
    private $orderBy;
    /**
     * @var string asc or desc
     */
    private $orderDir;

    /**
     * PaginationConfig constructor.
     * @param $page int
     * @param $perPage int
     * @param $search string
     * @param $orderBy string
     * @param $orderDir string asc or desc
     */
    public function __construct($page, $perPage, $search, $orderBy, $orderDir)
    {
        $this->page = $page >= 0 ? $page : 0;
        $this->perPage = $perPage > 0 ? $perPage : 15;
        $this->search = strlen(trim($search)) > 0 ? trim($search) : null;
        $this->orderBy = strlen(trim($orderBy)) > 0 ? trim($orderBy) : null;
        $this->orderDir = strtolower($orderDir) === 'asc' || strtolower($orderDir) === 'desc' ? strtolower($orderDir) : 'asc';
    }

    /**
     * @return int
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * @return int
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    /**
     * @return string
     */
    public function getSearch()
    {
        return $this->search;
    }

    /**
     * @return string
     */
    public function getOrderBy()
    {
        return $this->orderBy;
    }

    /**
     * @return string
     */
    public function getOrderDir()
    {
        return $this->orderDir;
    }

    /**
     * @param Request $request
     * @return PaginationConfig
     */
    public static function fromRequest(Request $request)
    {
        return new self(
            $request->get('page'),
            $request->get('perPage'),
            $request->get('search'),
            $request->get('orderBy'),
            $request->get('orderDir')
        );
    }
}
