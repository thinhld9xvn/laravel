<?php 
    namespace App\Helpers\Posts;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\Posts\Api\ApiRemovePostMetaField;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Validator;
    class RemovePostHelper {
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
            $post_action = $request->input(POST_DATA::POST_ACTION);
            $post_action = !empty($post_action) ? $post_action : POST_DATA_FIELDS::TRASH_ACTION;
            $model = GetPostTypeTablePrefix::perform($post_type);
            if ( $post_action === POST_DATA_FIELDS::TRASH_ACTION ) :
                foreach($guids as $key => $guid) :
                    DB::table($model)->where(POST_DB_FIELDS::POST_GUID, $guid)
                                    ->update([POST_DB_FIELDS::POST_STATUS => POST_DATA::POST_TRASH]);
                endforeach;
            endif;
            if ( $post_action === POST_DATA_FIELDS::REMOVE_PERMANTLY_ACTION ) :
                foreach($guids as $key => $guid) :
                    // remove basic meta post
                    ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_THUMBNAIL, $post_type);
                    ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_CATEGORIES, $post_type);
                    ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_TAGS, $post_type);
                    //
                    DB::table($model)->where(POST_DB_FIELDS::POST_GUID, $guid)->delete();
                endforeach;
            endif;
            return ResponseUtils::success(true);
        }
    }