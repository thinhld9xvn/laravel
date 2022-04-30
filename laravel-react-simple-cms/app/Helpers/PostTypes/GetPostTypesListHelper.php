<?php 
    namespace App\Helpers\PostTypes;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\PostTypes\Api\ApiGetPostTypesList;
    use Illuminate\Http\Request;
    class GetPostTypesListHelper {
        public static function perform(Request $request) {
            $value = ApiGetPostTypesList::perform();
            return ResponseUtils::success(is_null($value) ? [] : $value);
        }
    }