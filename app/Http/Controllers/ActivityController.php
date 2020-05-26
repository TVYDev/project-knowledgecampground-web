<?php

namespace App\Http\Controllers;

use App\Http\Support\Paginator;
use App\Lib\RequestAPI;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    use RequestAPI;

    public function __construct()
    {
        $this->middleware('verify_access_token');
    }

    public function getMyPosts (Request $request)
    {
        try {
            $perPage = 10;
            $tempDataResponse = [];
            $currentPage = isset($request->page) ? $request->page : 1;

            $response = $this->get(
                $this->getApiRequestUrl('activity.my_posts'),
                null,
                [
                    'page' => $currentPage,
                    'per_page' => $perPage
                ],
                $this->getAuthorizationHeader()
            );

            $paginator = null;
            if($response->success === true) {
                $tempDataResponse =$response->data->data;
                $paginationResponse = $response->data->pagination;

                $paginator = new Paginator($paginationResponse->total_records, $perPage, $currentPage, $request);
            }

            return view('activity.my_posts')
                ->with('items', $tempDataResponse)
                ->with('paginator', $paginator);
        }
        catch(\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function postVotePost (Request $request)
    {
        try {
            $response = $this->post(
                $this->getApiRequestUrl('activity.vote_post'),
                [
                    'post_type' => $request->post_type,
                    'post_public_id' => $request->post_public_id,
                    'vote' => $request->vote
                ],
                $this->getAuthorizationHeader()
            );

            if($response->success == true)
            {
                return response()->json($response);
            }
        }
        catch(\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function postManageFavoriteQuestion (Request $request)
    {
        try {
            $response = $this->post(
                $this->getApiRequestUrl('activity.manage_favorite_question'),
                [
                    'question_public_id' => $request->question_public_id,
                    'is_favorite' => $request->is_favorite == 'true' ? true : false
                ],
                $this->getAuthorizationHeader()
            );

            if($response->success == true) {
                return response()->json($response);
            }
        }
        catch(\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()]);
        }
    }
}
