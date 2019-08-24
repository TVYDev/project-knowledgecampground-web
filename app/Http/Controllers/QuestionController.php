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
    public function getPost () {return view('question.post_question');}
    public function postPost (Request $request)
    {

    }
}
