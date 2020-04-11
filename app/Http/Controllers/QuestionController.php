<?php

namespace App\Http\Controllers;

use App\Http\Support\Paginator;
use App\Http\Support\Supporter;
use App\Http\ViewModel\QuestionAnswerViewModel;
use App\Lib\Helper;
use App\Lib\HttpConstants;
use App\Lib\MiddlewareConstants;
use App\Lib\RequestAPI;
use App\Lib\ResponseEndPoint;
use App\Lib\RouteConstants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class QuestionController extends Controller
{
    use RequestAPI, ResponseEndPoint;

    protected $supporter = null;

    public function __construct()
    {
        $this->middleware(MiddlewareConstants::VERIFY_ACCESS_TOKEN)->except(['getView','getList','getInfo']);
        $this->supporter = new Supporter();
    }

    /**-------------------------------------------------------------------------
     * Purpose: Render page Ask Question
     *------------------------------------------------------------------------*/
    public function getPost ()
    {
        try
        {
            $publicId = $this->supporter->doGeneratePublicId();

            $resultSubjects = $this->get($this->getApiRequestUrl('subject.get_all_subjects'), null, null, $this->getAuthorizationHeader());

            return view('question.post_question')
                ->with('publicId', $publicId)
                ->with('subjectsData', Helper::getProp($resultSubjects, 'data'));
        }
        catch(\Exception $exception)
        {
            dd($exception->getMessage());
        }
    }

    public function getEdit ($publicId)
    {
        try
        {
            $resultQuestion = $this->get($this->getApiRequestUrl('question.view'), [$publicId]);
            if($resultQuestion->success === true) {
                $question = Helper::getProp($resultQuestion, 'data');
                $resultSubjects = $this->get($this->getApiRequestUrl('subject.get_all_subjects'), null, null, $this->getAuthorizationHeader());

                $resultSubjectTags = $this->get($this->getApiRequestUrl('question.get_subject_tags'), [$publicId]);
                $chosenSubject = Helper::getProp($resultSubjectTags->data, 'subject');
                $tempChosenTags = Helper::getProp($resultSubjectTags->data, 'tags');
                $tempTagPublicIds = [];
                foreach ($tempChosenTags as $chosenTag) {
                    array_push($tempTagPublicIds, Helper::getProp($chosenTag, 'public_id'));
                }
                $chosenTags = implode($tempTagPublicIds, ',');

                return view('question.post_question')
                    ->with('title', Helper::getProp($question, 'title'))
                    ->with('chosenSubject', Helper::getProp($chosenSubject, 'public_id'))
                    ->with('chosenTags', $chosenTags)
                    ->with('publicId', $publicId)
                    ->with('subjectsData', Helper::getProp($resultSubjects, 'data'))
                    ->with('isExisting', true);
            }
        }
        catch(\Exception $exception)
        {
            dd($exception->getMessage());
        }
    }

    /**-------------------------------------------------------------------------
     * Purpose: Save a question when its description is modified
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

            $response = $this->post($this->getApiRequestUrl('question.save_during_editing'),
                $requestedData,
                $this->getAuthorizationHeader(true, false), 'multipart');

            return response()->json($response);
        }
        catch(\Exception $exception)
        {
            return $exception->getMessage();
        }
    }

    /**-------------------------------------------------------------------------
     * Purpose: Save a completed question
     *------------------------------------------------------------------------*/
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

    /**-------------------------------------------------------------------------
     * Purpose: Render page View Question
     *------------------------------------------------------------------------*/
    public function getView ($publicId)
    {
        try
        {
            $response = $this->get($this->getApiRequestUrl('question.get_subject_tags'), [$publicId]);

            if($response->success) {
                $data = $response->data;

                $newAnswerPublicId = $this->supporter->doGeneratePublicId();

                $answers = [];
                $answersResponse = $this->get($this->getApiRequestUrl('answer.list_posted_answers'), [$publicId]);
                if ($answersResponse->success) {
                    $answers = Helper::getProp($answersResponse, 'data');
                }

                return view('question.view_question')
                    ->with('title', Helper::getProp($data, 'title'))
                    ->with('questionPublicId', Helper::getProp($data, 'public_id'))
                    ->with('subject', Helper::getProp($data, 'subject'))
                    ->with('tags', Helper::getProp($data, 'tags'))
                    ->with('answerPublicId', $newAnswerPublicId)
                    ->with('answers', $answers);
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

    /**-------------------------------------------------------------------------
     * Purpose: For AJAX, Get content of question for ContentActionView
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
            $resultQuestion = $this->get(
                $this->getApiRequestUrl('question.view'),
                [$publicId]
            );

            if($resultQuestion->success == true) {
                $success = true;
                $data = Helper::getProp($resultQuestion, 'data');
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
                $this->getApiRequestUrl('question.description'),
                [$publicId]
            );

            if($resultQuestion->success == true) {
                $success = true;
                $responseData = Helper::getProp($resultQuestion, 'data');
            }
            else {
                throw new \Exception('Unable to get description of question, public id = ' . $publicId);
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
//    public function getContentOfQuestion ($publicId)
//    {
//        $tempDataResponse = [];
//        try
//        {
//            $resultQuestion = $this->get(
//                $this->getApiRequestUrl('question.view'),
//                [$publicId],
//                null,
//                $this->getAuthorizationHeader()
//            );
//
//            if($resultQuestion->success == true) {
//                $dataQuestion = $resultQuestion->data;
//                $tempDataResponse['success'] = true;
//                $tempDataResponse['author_name'] = $dataQuestion->author_name;
//                $tempDataResponse['author_id'] = $dataQuestion->author_id;
//                $tempDataResponse['avatar_url'] = HttpConstants::HOST_URL . $dataQuestion->avatar_url;
//                $tempDataResponse['readable_time'] = $dataQuestion->readable_time_en;
//                $tempDataResponse['data'] = $dataQuestion->description->data;
//                $tempDataResponse['relative_path_store_images'] = HttpConstants::HOST_URL . $dataQuestion->description->relative_path_store_images;
//            }
//            else
//            {
//                throw new \Exception('Question not found');
//            }
//        }
//        catch(\Exception $exception)
//        {
//            $tempDataResponse['success'] = false;
//            $tempDataResponse['error_message'] = $exception->getMessage();
//        }
//        return response()->json($tempDataResponse);
//    }

    /**-------------------------------------------------------------------------
     * Purpose: Render page List of Questions and Handle question searching
     *------------------------------------------------------------------------*/
    public function getList(Request $request)
    {
        try
        {
            $perPage = 10;
            $tempDataResponse = [];
            $currentPage = isset($request->page) ? $request->page : 1;
            $resultQuestions = $this->get($this->getApiRequestUrl('question.list'),null,[
                'search' => $request->search,
                'per_page' => $perPage,
                'page' => $currentPage
            ]);

            $paginator = null;
            if($resultQuestions->success === true) {
                $tempDataResponse =$resultQuestions->data->data;
                $paginationResponse = $resultQuestions->data->pagination;

                $paginator = new Paginator($paginationResponse->total_records, $perPage, $currentPage, $request);
            }

            return view('question.list_question')
                ->with('items', $tempDataResponse)
                ->with('paginator', $paginator);
        }
        catch(\Exception $exception)
        {
            dd($exception->getMessage());
        }
    }
}
