<?php

namespace App\Http\Controllers;

use App\Http\Support\Supporter;
use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use http\Exception\UnexpectedValueException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
        try
        {
            $publicId = $this->supporter->doGeneratePublicId();

            $resultSubjects = $this->get($this->getApiRequestUrl('subject.get_all_subjects'), null, null, $this->getAuthorizationHeader());
            $subjectsDataToBePassedToView = [];
            foreach ($resultSubjects->data as $s){
                array_push($subjectsDataToBePassedToView, [
                    'public_id' => $s->public_id,
                    'name_en' => $s->name_en,
                    'name_kh' => $s->name_kh,
                    'img_url' => HttpConstants::HOST_URL . $s->img_url
                ]);
            }

            return view('question.post_question')
                ->with('publicId', $publicId)
                ->with('subjectsData', $subjectsDataToBePassedToView);
        }
        catch(\Exception $exception)
        {

        }
    }
    public function postSaveDuringEditing (Request $request)
    {
        try
        {
            $fileContent = null;
            $fileName = null;
            if($request->hasFile('image_file_upload')){
                $fileInput = $request->image_file_upload;
                $filePath = $fileInput->getRealPath();
                $fileName = $fileInput->getClientOriginalName();
                $fileContent = File::get($filePath);
            }

            $requestedData = [
                [
                    'name'  => 'public_id',
                    'contents' => $request->public_id
                ],
                [
                    'name'  => 'title',
                    'contents' => $request->title
                ],
                [
                    'name'  => 'description',
                    'contents' => $request->desc_data
                ],
                [
                    'name'  => 'is_draft',
                    'contents' => true
                ],
                [
                    'name'  => 'image_file_name',
                    'contents' => $request->image_file_name
                ],
                [
                    'name'  => 'image_file_upload',
                    'contents' => $fileContent,
                    'filename' => $fileName
                ]
            ];

            $response = $this->post($this->getApiRequestUrl('question.save_during_editing'),
                $requestedData,
                $this->getAuthorizationHeader(true, false), 'multipart');
        }
        catch(\Exception $exception)
        {

        }
    }

    public function postPost (Request $request)
    {
        try
        {
            $tagPublicIds = $request->tags;

            $isDraft = false;
            if($request->has('submit') && $request->submit == 'draft')
            {
                $isDraft = true;
            }

            $arrayTagPublicId = [];
            if(isset($tagPublicIds) && $tagPublicIds !== '')
            {
                $arrayTagPublicId = explode(',', $tagPublicIds);
            }

            $publicId = $request->publicId;
            $response = $this->put($this->getApiRequestUrl('question.save'), $publicId, [
                'title'     => $request->title,
                'is_draft'  => $isDraft,
                'subject_public_id' => $request->subject,
                'tag_public_ids' => $arrayTagPublicId
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
                $subject = [
                    'public_id' => $data->subject->public_id,
                    'name_en'   => $data->subject->name_en,
                    'name_kh'   => $data->subject->name_kh,
                    'img_url'   => HttpConstants::HOST_URL . $data->subject->img_url
                ];

                $tags = [];
                if(isset($data->tags)){
                    foreach ($data->tags as $t){
                        array_push($tags, [
                            'public_id' => $t->public_id,
                            'name_en'   => $t->name_en,
                            'name_kh'   => $t->name_kh,
                            'img_url'   => HttpConstants::HOST_URL . $t->img_url
                        ]);
                    }
                }

                return view('question.view_question')
                    ->with('publicId', $publicId)
                    ->with('title', $data->title)
                    ->with('readableTime', $data->readable_time_en)
                    ->with('authorName', $data->author_name)
                    ->with('authorId', $data->author_id)
                    ->with('avatarUrl', HttpConstants::HOST_URL . $data->avatar_url)
                    ->with('subject', $subject)
                    ->with('tags', $tags)
                    ->with('relativePathStoreImagesOfQuestion', HttpConstants::HOST_URL . $data->relative_path_store_images_of_question);
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
        $tempDataResponse = [];
        try
        {
            $response = $this->get(
                $this->getApiRequestUrl('question.description'),
                $publicId,
                null,
                $this->getAuthorizationHeader()
            );

            if($response->success == true){
                $data = $response->data;
                $tempDataResponse['success'] = true;
                $tempDataResponse['data'] = $data->data;
                $tempDataResponse['relative_path_store_images'] = HttpConstants::HOST_URL . $data->relative_path_store_images;
            }
            else{
                throw new UnexpectedValueException('Get description failed');
            }
        }
        catch(\Exception $exception)
        {
            $tempDataResponse['success'] = false;
            $tempDataResponse['error_message'] = $exception->getMessage();
        }
        return response()->json($tempDataResponse);
    }
}
