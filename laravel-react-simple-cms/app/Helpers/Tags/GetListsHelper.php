<?php
    namespace App\Helpers\Tags;
    use App\Classes\Tags\a\TagDataFields as TAG_DATA_FIELDS;
    use App\Classes\Tags\b\GetTreeListsData;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class GetListsHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                TAG_DATA_FIELDS::POST_TYPE => 'required'
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $post_type = $request->input(TAG_DATA_FIELDS::POST_TYPE);
            $data = GetTreeListsData::perform($post_type);
            usort($data, function($r1, $r2) {
                $name1 = mb_strtolower($r1['name'], 'UTF-8');
                $name2 = mb_strtolower($r2['name'], 'UTF-8');
                return strcmp($name1, $name2);
            });  
            return ResponseUtils::success($data);
        }
    }