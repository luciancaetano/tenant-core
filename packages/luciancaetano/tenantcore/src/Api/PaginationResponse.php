<?php


namespace LucianCaetano\TenantCore\Api;

class PaginationResponse
{
    /**
     * @var int
     */
    private $currentPage;
    /**
     * @var int
     */
    private $from;
    /**
     * @var int
     */
    private $to;
    /**
     * @var int
     */
    private $perPage;
    /**
     * @var
     */
    private $lastPage;
    /**
     * @var int
     */
    private $total;

    /**
     * PaginationResponse constructor.
     * @param int $currentPage
     * @param int $from
     * @param int $to
     * @param int $perPage
     * @param int $total
     */
    public function __construct($currentPage = 0, $from = 0, $to = 0, $perPage = 0, $total = 0)
    {
        $this->currentPage = $currentPage;
        $this->from = $from;
        $this->to = $to;
        $this->perPage = $perPage;
        $this->total = $total;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'currentPage' => (int)$this->getCurrentPage(),
            'from' => (int)$this->getFrom(),
            'to' => (int)$this->getTo(),
            'lastPage' => (int)$this->getLastPage(),
            'perPage' => (int)$this->getPerPage(),
            'total' => (int)$this->getTotal()
        ];
    }

    /**
     * @return int
     */
    public function getCurrentPage()
    {
        return $this->currentPage;
    }

    /**
     * @param int $currentPage
     * @return PaginationResponse
     */
    public function setCurrentPage($currentPage)
    {
        $this->currentPage = $currentPage;
        return $this;
    }

    /**
     * @return int
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @param int $from
     * @return PaginationResponse
     */
    public function setFrom($from)
    {
        $this->from = $from;
        return $this;
    }

    /**
     * @return int
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * @param int $to
     * @return PaginationResponse
     */
    public function setTo($to)
    {
        $this->to = $to;
        return $this;
    }

    /**
     * @return int
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    /**
     * @param int $perPage
     * @return PaginationResponse
     */
    public function setPerPage($perPage)
    {
        $this->perPage = $perPage;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastPage()
    {
        return $this->lastPage;
    }

    /**
     * @param mixed $lastPage
     * @return PaginationResponse
     */
    public function setLastPage($lastPage)
    {
        $this->lastPage = $lastPage;
        return $this;
    }

    /**
     * @return int
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * @param int $total
     * @return PaginationResponse
     */
    public function setTotal($total)
    {
        $this->total = $total;
        return $this;
    }
}
