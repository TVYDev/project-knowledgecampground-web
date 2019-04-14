<?php

namespace App\Http\Controllers;

use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    public function __construct()
    {
        $this->middleware('verify_access_token');
    }

    /**-------------------------------------------------------------------------
     * Question Ask (Create)
     * [GET] [POST]
     *------------------------------------------------------------------------*/
    public function getAsk () {return view('question.ask');}
    public function postAsk (Request $request)
    {

    }
}
