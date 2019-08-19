<?php

namespace App\Http\Controllers;

use App\Lib\RequestAPI;
use Illuminate\Http\Request;

class QuestionDescriptionController extends Controller
{
    use RequestAPI;

    public function postSave(Request $request)
    {
        $response = $this->post($this->getApiRequestUrl('question_description.save'), [
            'desc_data' => $request->desc_data
        ], $this->getAuthorizationHeader());

        return json_encode($response->data);
    }
}
