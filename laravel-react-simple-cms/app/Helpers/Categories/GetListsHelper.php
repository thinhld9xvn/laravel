<?php
    namespace App\Helpers\Categories;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Categories\b\GetTreeListsData;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Validator;
    class GetListsHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                CATEGORY_DATA_FIELDS::POST_TYPE => 'required'
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $post_type = $request->input(CATEGORY_DATA_FIELDS::POST_TYPE);
            $tax = $request->input(CATEGORY_DATA_FIELDS::TAX);
            $data = GetTreeListsData::perform($post_type, !empty($tax) ? $tax : '');
            return ResponseUtils::success($data);
        }
    }