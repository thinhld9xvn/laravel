<?php 
    namespace App\Helpers\Posts;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Validator;
    class RestorePostHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                POST_DATA::POST_TYPE => 'required',
                POST_DATA::POST_GUID => 'required'
            ]);
            if ( $validator->fails() ) :
                return ResponseUtils::error($validator->errors()->all());
            endif;
            $guids = json_decode($request->input(POST_DATA::POST_GUID), true); // nhận một tập mảng ids
            $post_type = $request->input(POST_DATA::POST_TYPE);
            $model = GetPostTypeTablePrefix::perform($post_type);
            foreach($guids as $key => $guid) :
                DB::table($model)->where(POST_DB_FIELDS::POST_GUID, $guid)
                                ->update([POST_DB_FIELDS::POST_STATUS => POST_DATA::POST_PUBLIC]);
            endforeach;
            return ResponseUtils::success(true);
        }
    }