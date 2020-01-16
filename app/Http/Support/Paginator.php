<?php


namespace App\Http\Support;



use Illuminate\Http\Request;

class Paginator
{
    protected $perPage;
    protected $currentPage;
    protected $total;
    protected $inputs;
    protected $url;

    protected $pageParam = 'page';

    protected $maxNumLinks = 9;
    protected $minNumLinks = 2;
    protected $numLinksToSplit = 4;

    public function __construct($total, $perPage, $currentPage, Request $request)
    {
        $this->perPage = $perPage;
        $this->currentPage = $currentPage;
        $this->total = $total;
        $this->inputs = $request->all();
        $this->url = url('/') . $request->getPathInfo();
    }

    /**
     * Render the whole pagination into the view
     * @return string
     */
    public function getPaginatedLinks() {
        $stopRender = false;
        $totalPages = $this->_calculateNumberOfPages();

        if($this->currentPage <= $totalPages){
            $childHtml = $this->_renderLinkForPreviousPage();

            // For rendering left part of pagination, includes at most 9 links on the left
            if($totalPages >= $this->maxNumLinks + $this->numLinksToSplit && $this->currentPage >= $this->maxNumLinks) {
                for($i=1; $i<=$this->minNumLinks; $i++) {
                    $childHtml .= $this->_renderLinkForOnePage($i);
                }
                $childHtml .= $this->_renderNoLink();
            }

            // For rendering the middle part of pagination
            if($this->currentPage < $this->maxNumLinks) {
                $endForLinks = $totalPages <= $this->maxNumLinks ? $totalPages : $this->maxNumLinks;
                if($totalPages - $this->maxNumLinks < 4) {
                    $endForLinks = $totalPages;
                }
                for($i=1; $i<=$endForLinks; $i++) {
                    $childHtml .= $this->_renderLinkForOnePage($i);
                }
            }elseif($this->currentPage >= $this->maxNumLinks && $this->currentPage <= $totalPages - $this->maxNumLinks + 1) {
                for($i=$this->currentPage-2; $i<$this->currentPage+3; $i++) {
                    $childHtml .= $this->_renderLinkForOnePage($i);
                }
            }else {
                if($totalPages >= $this->maxNumLinks + $this->numLinksToSplit) {
                    $startForLinks = $totalPages-$this->maxNumLinks + 1;
                }else {
                    $startForLinks = 1;
                }
                for($i=$startForLinks; $i<=$totalPages; $i++) {
                    $childHtml .= $this->_renderLinkForOnePage($i);
                    $stopRender = true;
                }
            }

            // For rendering right part of pagination, includes at most 9 links on the right
            if($totalPages >= $this->maxNumLinks + $this->numLinksToSplit && !$stopRender) {
                $childHtml .= $this->_renderNoLink();
                for($i=$totalPages-($this->minNumLinks - 1); $i<=$totalPages; $i++) {
                    $childHtml .= $this->_renderLinkForOnePage($i);
                }
            }
            $childHtml .= $this->_renderLinkForNextPage();
        }else {
            return null;
        }

        // Returning the whole markup of pagination, so it can be rendered in the view
        return '<ul class="KCPagination">'.$childHtml.'</ul>';
    }

    /**
     * Generate a query string of params for a page_num,
     * so that it can navigate the page and get data from the 2 sources correctly
     * @param $pageNum
     * @return string|null
     */
    private function _generateRouteParamsForAPage ($pageNum) {
        return "?page=$pageNum".$this->_getQueryStringOfFormInputs();
    }

    private function _getQueryStringOfFormInputs ()
    {
        $ips = $this->inputs;

        foreach($ips as $key=>$value)
        {
            if(in_array($key, [$this->pageParam])){
                unset($ips[$key]);
            }
        }

        $queryString = '';
        foreach ($ips as $key=>$value) {
            if(is_array($value)) {
                foreach ($value as $k=>$v) {
                    // Current solution only apply to one level of array, multi-level array will set to empty string
                    if(!is_string($v)) {
                        $v = '';
                    }
                    $tmpQueryString = "$key" . "[$k]" . "=$v";
                    $queryString .= "&$tmpQueryString";
                }
            }
            else {
                $queryString .= "&$key=$value";
            }
        }
        return $queryString;
    }

    /**
     * Get number of pages based on total elements passed in
     * @param $total
     * @return float
     */
    private function _calculateNumberOfPages () {
        return ceil($this->total / $this->perPage);
    }

    /**
     * Generate markup for a link of the pagination, and provide its href with generated route params
     * @param $pageNum
     * @return string
     */
    private function _renderLinkForOnePage ($pageNum) {
        $className = '';
        if($pageNum == $this->currentPage) {
            $className = 'active';
            $html = '<span>' . $pageNum . '</span>';
        }else {
            $href = $this->url . $this->_generateRouteParamsForAPage($pageNum);
            $html = '<a href="' . $href . '">' . $pageNum . '</a>';
        }
        return '<li class="' . $className . '">'.$html.'</li>';
    }

    /**
     * Generate markup for "Prev" link of the pagination, and provide its href with generated route params
     * @return string
     */
    private function _renderLinkForPreviousPage () {
        if($this->currentPage == 1){
            $html = '<span class="disabled">⮜</span>';
        }else {
            $href = $this->url . $this->_generateRouteParamsForAPage($this->currentPage - 1);
            $html = '<a href="' . $href . '">⮜</a>';
        }
        return '<li class="previous">'.$html.'</li>';
    }

    /**
     * Generate markup for "Next" link of the pagination, and provide its href with generated route params
     * @return string
     */
    private function _renderLinkForNextPage () {
        if($this->currentPage == $this->_calculateNumberOfPages()) {
            $html = '<span class="disabled">⮞</span>';
        }else {
            $href = $this->url . $this->_generateRouteParamsForAPage($this->currentPage + 1);
            $html = '<a href="' . $href . '">⮞</a>';
        }
        return '<li class="next">'.$html.'</li>';
    }

    /**
     * Generate markup for disabled link
     * @return string
     */
    private function _renderNoLink () {
        return '<li><span class="disabled">...</span></li>';
    }

    /**
     * Get current page
     * @return int
     */
    public function getCurrentPage()
    {
        return $this->currentPage;
    }

    /**
     * Get number records per page
     * @return int
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    /**
     * Get grand total of records
     * @return mixed
     */
    public function getTotalRecords()
    {
        return $this->total;
    }

    /**
     * Get total of pages
     * @return float
     */
    public function getTotalPages ()
    {
        return $this->_calculateNumberOfPages();
    }
}
