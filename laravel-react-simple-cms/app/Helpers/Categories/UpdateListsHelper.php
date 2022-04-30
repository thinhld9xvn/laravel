<?php
    namespace App\Helpers\Categories;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Categories\b\RemoveTreeListsData;
    use App\Classes\Categories\b\UpdateTreeListsData;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class UpdateListsHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                CATEGORY_DATA_FIELDS::POST_TYPE => 'required',
                CATEGORY_DATA_FIELDS::DATA => 'required',
                CATEGORY_DATA_FIELDS::RM_IDS => 'required',
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $post_type = $request->input(CATEGORY_DATA_FIELDS::POST_TYPE);
            $tax = $request->input(CATEGORY_DATA_FIELDS::TAX);
            $data = json_decode($request->input(CATEGORY_DATA_FIELDS::DATA), true);
            $rm_ids = json_decode($request->input(CATEGORY_DATA_FIELDS::RM_IDS), true);
            RemoveTreeListsData::perform($rm_ids, $post_type, !empty($tax) ? $tax : CATEGORY_DATA_FIELDS::CATEGORY_PREFIX, true);
            UpdateTreeListsData::perform($data, $post_type, !empty($tax) ? $tax : CATEGORY_DATA_FIELDS::CATEGORY_PREFIX, true);
            return ResponseUtils::success(true);
        }
    }