<?php

namespace App\Http\Controllers;

use App\Http\ViewModel\QuestionAnswerViewModel;
use App\Lib\Helper;
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

    /**-------------------------------------------------------------------------
     * Purpose: Save a completed answer
     *------------------------------------------------------------------------*/
    public function postPost (Request $request)
    {
        $referencePublicId = null;
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
                true,
                ['publicId' => $referencePublicId]
            );
        }
    }

    /**-------------------------------------------------------------------------
     * Purpose: Save a answer when its description is modified
     *------------------------------------------------------------------------*/
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
                    'contents' => $request->is_draft
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

            return response()->json($response);
        }
        catch(\Exception $exception)
        {
            return $exception->getMessage();
        }
    }

//    public function getContentOfAnswer ($publicId)
//    {
//        $tempDataResponse = [];
//        try
//        {
//            $resultAnswer = $this->get(
//                $this->getApiRequestUrl('answer.view'),
//                [$publicId],
//                null,
//                $this->getAuthorizationHeader()
//            );
//
//            if($resultAnswer->success == true) {
//                $dataAnswer = $resultAnswer->data;
//                $tempDataResponse['success'] = true;
//                $tempDataResponse['author_name'] = $dataAnswer->author_name;
//                $tempDataResponse['author_id'] = $dataAnswer->author_id;
//                $tempDataResponse['avatar_url'] = HttpConstants::HOST_URL . $dataAnswer->avatar_url;
//                $tempDataResponse['readable_time'] = $dataAnswer->readable_time_en;
//                $tempDataResponse['data'] = $dataAnswer->description->data;
//                $tempDataResponse['relative_path_store_images'] = HttpConstants::HOST_URL . $dataAnswer->description->relative_path_store_images;
//            }
//            else
//            {
//                throw new UnexpectedValueException('Answer not found');
//            }
//        }
//        catch(\Exception $exception)
//        {
//            $tempDataResponse['success'] = false;
//            $tempDataResponse['error_message'] = $exception->getMessage();
//        }
//        return response()->json($tempDataResponse);
//    }

//    public function getListPostedAnswersOfQuestion ($questionPublicId, $sortedType)
//    {
//        try
//        {
//            $answers = $this->get(
//                $this->getApiRequestUrl('answer.list_posted_answers'),
//                [$questionPublicId, $sortedType],
//                null,
//                $this->getAuthorizationHeader()
//            );
//
//            if($answers->success == true) {
//                $publicIds = [];
//                foreach ($answers->data as $ans) {
//                    array_push($publicIds, $ans->public_id);
//                }
//                return response()->json($publicIds);
//            }else {
//                throw new UnexpectedValueException('Question not found');
//            }
//        }
//        catch(\Exception $exception)
//        {
//            return response()->json(['errorMessage' => $exception->getMessage()]);
//        }
//    }
    /**-------------------------------------------------------------------------
     * Purpose: For AJAX, Get description of question
     *------------------------------------------------------------------------*/
    public function getDescription ($publicId, Request $request)
    {
        // This route only from ajax request
        if(!$request->ajax()) {
            return 'Invalid Request Gateway';
        }

        $responseData = null;
        $errorMsg = null;
        try
        {
            $resultQuestion = $this->get(
                $this->getApiRequestUrl('answer.description'),
                [$publicId]
            );

            if($resultQuestion->success == true) {
                $success = true;
                $responseData = Helper::getProp($resultQuestion, 'data');
            }
            else {
                throw new \Exception('Unable to get description of answer, public id = ' . $publicId);
            }
        }
        catch(\Exception $exception)
        {
            $success = false;
            $errorMsg = $exception->getMessage();
        }

        return response()->json([
            'success'       => $success,
            'data'          => $responseData,
            'error_message' => $errorMsg
        ]);
    }


    /**-------------------------------------------------------------------------
     * Purpose: For AJAX, Get content of answer for ContentActionView
     *------------------------------------------------------------------------*/
    public function getInfo ($publicId, Request $request)
    {
        // This route only from ajax request
        if(!$request->ajax()) {
            return 'Invalid Request Gateway';
        }

        $responseData = null;
        $errorMsg = null;
        try
        {
            $queryString = null;
            if($request->has('viewer')) {
                $queryString = '?viewer=' . $request->viewer;
            }

            $resultAnswer = $this->get(
                $this->getApiRequestUrl('answer.view'),
                [$publicId],
                null,
                null,
                null,
                $queryString
            );

            if($resultAnswer->success == true) {
                $success = true;
                $data = Helper::getProp($resultAnswer, 'data');
                $responseData = (new QuestionAnswerViewModel())->getStandardPreparedDataForView($data);
            }
            else {
                throw new \Exception('Unable to get info of question, public id = ' . $publicId);
            }
        }
        catch(\Exception $exception)
        {
            $success = false;
            $errorMsg = $exception->getMessage();
        }

        return response()->json([
            'success'       => $success,
            'data'          => $responseData,
            'error_message' => $errorMsg
        ]);
    }
}
