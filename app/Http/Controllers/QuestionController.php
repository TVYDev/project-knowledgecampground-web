<?php

namespace App\Http\Controllers;

use App\Http\Support\Supporter;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    protected $supporter = null;

    public function __construct()
    {
        $this->middleware('verify_access_token');
        $this->supporter = new Supporter();
    }

    /**-------------------------------------------------------------------------
     * Question Ask (Create)
     * [GET] [POST]
     *------------------------------------------------------------------------*/
    public function getPost ()
    {
        $publicId = $this->supporter->doGeneratePublicId();
        return view('question.post_question')->with('publicId', $publicId);
    }
    public function postSaveDuringEditing (Request $request)
    {
        try
        {
            $response = $this->post($this->getApiRequestUrl('question.save_during_editing'), [
                'public_id'     => $request->public_id,
                'title'         => $request->title,
                'description'   => $request->desc_data,
                'is_draft'      => true
            ], $this->getAuthorizationHeader());
        }
        catch(\Exception $exception)
        {

        }
    }

    public function postPost (Request $request)
    {
        try
        {
            $is_draft = false;
            if($request->has('submit') && $request->submit == 'draft')
            {
                $is_draft = true;
            }

            $publicId = $request->publicId;
            $response = $this->put($this->getApiRequestUrl('question.save'), $publicId, [
                'title'     => $request->title,
                'is_draft'  => $is_draft
            ], $this->getAuthorizationHeader());

            if($response->success == true)
            {
                return $this->doResponseSuccess(RouteConstants::HOME, $response->message_en, false);
            }
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError(
                $exception,
                true,
                RouteConstants::QUESTION_GET_POST,
                true
            );
        }
    }

    /************************************************
     * Question View
     * [GET]
     ***********************************************/
    public function getView ($publicId)
    {
        try
        {
//            $response = $this->get($this->getApiRequestUrl('question.view'), $publicId, null, $this->getAuthorizationHeader());

            return view('question.view_question')->with('publicId', $publicId);
        }
        catch(\Exception $exception)
        {
            dd($exception);
            return $this->doResponseError(
                $exception,
                true,
                RouteConstants::HOME,
                false
            );
        }
    }
}
