<?php

namespace App\Http\Controllers;

use App\Http\Support\Supporter;
use App\Lib\HttpConstants;
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
                return $this->doResponseSuccess(
                    RouteConstants::QUESTION_GET_VIEW,
                    $response->message_en,
                    false,
                    ['publicId' => $publicId]
                );
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
            $response = $this->get($this->getApiRequestUrl('question.view'), $publicId, null, $this->getAuthorizationHeader());

            if($response->success) {
                $data = $response->data;
                return view('question.view_question')
                    ->with('publicId', $publicId)
                    ->with('title', $data->title)
                    ->with('readableTime', $data->readable_time_en)
                    ->with('authorName', $data->author_name)
                    ->with('authorId', $data->author_id)
                    ->with('avatarUrl', HttpConstants::HOST_URL . $data->avatar_url);
            }
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError(
                $exception,
                true,
                RouteConstants::HOME,
                false
            );
        }
    }

    public function getDescriptionOf ($publicId)
    {
        try
        {
            $response = $this->get(
                $this->getApiRequestUrl('question.description'),
                $publicId,
                null,
                $this->getAuthorizationHeader()
            );

            if($response->success == true){
                return $response->data->data;
            }
            return null;
        }
        catch(\Exception $exception)
        {
            return null;
        }
    }
}
