<?php 
    namespace App\Helpers\PostTypes;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\PostTypes\Api\ApiGenerateOption;
    use App\Helpers\PostTypes\Api\ApiGetParameters;
    use App\Helpers\PostTypes\Api\ApiGetPostTypesList;
    use App\Helpers\PostTypes\Api\ApiUpdatePostTypes;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class UpdatePostTypeHelper {
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
            $params = ApiGetParameters::perform($request);
            extract($params);
            //
            $options = ApiGetPostTypesList::perform();
            if ( is_null($options) ) :
                return ResponseUtils::error("post type options empty.");
            endif;
            //
            $old_slug = '';
            $option = ApiGenerateOption::perform($params);
            foreach($options as $key => &$postType) :
                if ( $postType[POST_DATA::PT_OPTION_ID] === $id ) :
                    $old_slug = $postType[POST_DATA::PT_OPTION_SLUG];
                    $postType = $option;
                endif;
            endforeach;
            ApiUpdatePostTypes::perform($options, $option, $old_slug);
            return ResponseUtils::success(true);
        }
    }