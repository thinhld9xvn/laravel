<?php 
    namespace App\Helpers\PostTypes;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\PostTypes\Api\ApiRemovePostType;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class RemovePostTypeHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                POST_DATA::POST_TYPE_DATA => 'required'
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $data = json_decode($request->input(POST_DATA::POST_TYPE_DATA), true);
            $action = $request->input(POST_DATA::POST_TYPE_ACTION);
            $action = !empty($action) ? $action : POST_DATA_FIELDS::TRASH_ACTION;
            ApiRemovePostType::perform($data, $action);
            //
            return ResponseUtils::success(true);
        }
    }