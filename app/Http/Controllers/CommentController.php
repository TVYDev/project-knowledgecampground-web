<?php

namespace App\Http\Controllers;

use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    public function __construct()
    {
        $this->middleware('verify_access_token');
    }

    public function postPost (Request $request)
    {
        try
        {
            $response = $this->post($this->getApiRequestUrl('comment.save'),[
                'commentable_public_id' => $request->commentable_public_id,
                'commentable_type' => $request->commentable_type,
                'body' => $request->body
            ], $this->getAuthorizationHeader());
        }
        catch(\Exception $exception)
        {

        }
    }
}
