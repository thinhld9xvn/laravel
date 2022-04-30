<?php 
    namespace App\Helpers\PostTypes;
    use App\Classes\Options\a\OptionsData as OPTIONS_DATA;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\PostTypes\Api\ApiGetPostTypesList;
    use App\Models\Options;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class RestorePostTypeHelper {
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
            //
            $options = ApiGetPostTypesList::perform();
            foreach($options as $key => &$postType) :
                $id = $postType[POST_DATA::PT_OPTION_ID];
                if ( FALSE !== array_search($id, $data) ) :
                    $postType[POST_DATA::PT_OPTION_STATUS] = POST_DATA::POST_PUBLIC;
                endif;
            endforeach;
            Options::where(OPTIONS_DATA::OPTION_NAME, OPTIONS_DATA::POST_TYPES_OPTION)
                    ->update([OPTIONS_DATA::OPTION_VALUE => serialize($options)]);
            return ResponseUtils::success(true);
        }
    }