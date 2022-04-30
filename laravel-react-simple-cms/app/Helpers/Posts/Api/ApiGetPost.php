<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Posts\b\metadata\GetPostMeta;
    use App\Classes\Utils\DateTimeUtils;
    use Illuminate\Support\Facades\DB;
    class ApiGetPost {
        public static function perform($guid, $post_type = 'post') {
            $model = GetPostTypeTablePrefix::perform($post_type);
            $post = (array) DB::table($model)
                                ->where(POST_DB_FIELDS::POST_GUID, $guid)
                                ->first();
            $post[POST_DB_FIELDS::POST_DATE] = DateTimeUtils::convert_str($post[POST_DB_FIELDS::POST_DATE]);
            $post[POST_DB_FIELDS::POST_MODIFIED_DATE] = DateTimeUtils::convert_str($post[POST_DB_FIELDS::POST_MODIFIED_DATE]);
            $post_meta = GetPostMeta::perform($guid, $post_type);
            return array_merge($post, $post_meta);
        }
    }