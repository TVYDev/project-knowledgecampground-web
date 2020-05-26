<?php


namespace App\Http\ViewModel;


use App\Lib\Helper;

class QuestionAnswerViewModel
{
    public function getStandardPreparedDataForView ($data)
    {
        $responseData = [];
        if(isset($data)) {
            $responseData['owner_avatar_url'] = Helper::getProp($data, 'avatar_url');
            $responseData['author_name'] = Helper::getProp($data, 'author_name');
            $responseData['author_id'] = Helper::getProp($data, 'author_id');
            $responseData['readable_time'] = Helper::getProp($data, 'readable_time_en');

            $descriptionPayLoad = Helper::getProp($data, 'description');
            $tmpDescription = isset($descriptionPayLoad) ? Helper::getProp($descriptionPayLoad, 'tmp_data') : null;
            if(isset($tmpDescription)) {
                $description = $tmpDescription;
            }else {
                $description = isset($descriptionPayLoad) ? Helper::getProp($descriptionPayLoad, 'data') : null;
            }

            $responseData['description'] = Helper::isValidJSONString($description) ? $description : null;
            $responseData['relativePathStoreImages'] = isset($descriptionPayLoad) ? Helper::getProp($descriptionPayLoad, 'relative_path_store_images') : null;

            $responseData['comments'] = Helper::getProp($data, 'comments', []);
            $responseData['vote'] = Helper::getProp($data, 'vote', 0);
            $responseData['vote_by_viewer'] = Helper::getProp($data, 'vote_by_viewer', 0);
            $responseData['is_favorite_by_viewer'] = Helper::getProp($data, 'is_favorite_by_viewer', false);
        }
        return $responseData;
    }
}
