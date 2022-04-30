<?php 
    namespace App\Helpers\Posts;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\Posts\Api\ApiGetPost;
    use Illuminate\Support\Facades\Validator;
    class GetPostHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                POST_DATA::POST_TYPE => 'required',
                POST_DATA::POST_GUID => 'required'
            ]);
            if ( $validator->fails() ) :
                return ResponseUtils::error($validator->errors()->all());
            endif;
            $guid = $request->input(POST_DATA::POST_GUID);
            $post_type = $request->input(POST_DATA::POST_TYPE);            
            $data = ApiGetPost::perform($guid, $post_type);
            return ResponseUtils::success($data);
        }
    }