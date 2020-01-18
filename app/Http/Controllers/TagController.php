<?php

namespace App\Http\Controllers;

use App\Lib\HttpConstants;
use App\Lib\RequestAPI;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use RequestAPI;

    public function getTagsOfSubject($subjectId)
    {
        try
        {
            $resultTags = $this->get($this->getApiRequestUrl('tag.get_tags_of_subject'),
                [$subjectId], null, $this->getAuthorizationHeader());

            $tagsDataToReturn = [];
            if($resultTags->success == true){
                foreach ($resultTags->data as $t){
                    array_push($tagsDataToReturn, [
                        'public_id' => $t->public_id,
                        'name_en' => $t->name_en,
                        'name_kh' => $t->name_kh,
                        'desc_en' => $t->description_en,
                        'desc_kh' => $t->description_kh,
                        'img_url' => $t->img_url
                    ]);
                }
            }
            return response()->json($tagsDataToReturn);
        }
        catch(\Exception $exception)
        {
            dd($exception);
        }
    }
}
