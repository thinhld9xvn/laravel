<?php 
    namespace App\Helpers\PostTypes;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\PostTypes\Api\ApiCreatePostTypes;
    use App\Helpers\PostTypes\Api\ApiGenerateOption;
    use App\Helpers\PostTypes\Api\ApiGetParameters;
    use App\Helpers\PostTypes\Api\ApiGetPostTypesList;
    use App\Helpers\PostTypes\Api\ApiUpdatePostTypes;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class CreatePostTypeHelper {
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
            //
            $options = ApiGetPostTypesList::perform();
            $options = is_null($options) ? [] : $options;
            $isCreate = count($options) === 0;
            //
            $option = ApiGenerateOption::perform($params);
            $options[] = $option;
            if ( $isCreate ) :
                ApiCreatePostTypes::perform($options, $option);
            else :
                ApiUpdatePostTypes::perform($options, $option);
            endif;
            return ResponseUtils::success(true);
        }
    }