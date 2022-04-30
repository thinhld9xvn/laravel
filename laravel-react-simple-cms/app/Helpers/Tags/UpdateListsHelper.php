<?php
    namespace App\Helpers\Tags;
    use App\Classes\Tags\a\TagDataFields as TAG_DATA_FIELDS;
    use App\Classes\Tags\b\RemoveTreeListsData;
    use App\Classes\Tags\b\UpdateTreeListsData;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class UpdateListsHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                TAG_DATA_FIELDS::POST_TYPE => 'required',
                TAG_DATA_FIELDS::DATA => 'required',
                TAG_DATA_FIELDS::RM_IDS => 'required',
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $post_type = $request->input(TAG_DATA_FIELDS::POST_TYPE);
            $data = json_decode($request->input(TAG_DATA_FIELDS::DATA), true);
            $rm_ids = json_decode($request->input(TAG_DATA_FIELDS::RM_IDS), true);
            RemoveTreeListsData::perform($rm_ids, $post_type);
            UpdateTreeListsData::perform($data, $post_type);
            return ResponseUtils::success(true);
        }
    }