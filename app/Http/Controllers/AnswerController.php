<?php

namespace App\Http\Controllers;

use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use http\Exception\UnexpectedValueException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AnswerController extends Controller
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
            $isDraft = false;
            if($request->has('submit') && $request->submit == 'draft')
            {
                $isDraft = true;
            }

            $publicId = $request->publicId;
            $referencePublicId = $request->referencePublicId;
            $response = $this->put($this->getApiRequestUrl('answer.save'), $publicId, [
                'is_draft'  => $isDraft,
            ], $this->getAuthorizationHeader());

            if($response->success == true)
            {
                return $this->doResponseSuccess(
                    RouteConstants::QUESTION_GET_VIEW,
                    $response->message_en,
                    false,
                    ['publicId' => $referencePublicId]
                );
            }
        }
        catch(\Exception $exception)
        {
            return $this->doResponseError(
                $exception,
                true,
                RouteConstants::QUESTION_GET_VIEW,
                true
            );
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
                    'name'  => 'question_public_id',
                    'contents' => $request->question_public_id
                ],
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

            $response = $this->post(
                $this->getApiRequestUrl('answer.save_during_editing'),
                $requestedData,
                $this->getAuthorizationHeader(true, false),
                'multipart'
            );
        }
        catch(\Exception $exception)
        {
            dd($exception);
        }
    }

    public function getDescriptionOf ($publicId)
    {
        try
        {
            $response = $this->get(
                $this->getApiRequestUrl('answer.description'),
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

    public function getListPostedAnswersOf ($questionPublicId)
    {
        try
        {

        }
        catch(\Exception $exception)
        {

        }
    }
}
