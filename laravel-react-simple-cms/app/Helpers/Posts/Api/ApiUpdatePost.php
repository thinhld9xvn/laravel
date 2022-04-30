<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Posts\b\GetUniqueSlug;
    use Illuminate\Support\Facades\DB;
    class ApiUpdatePost {
        public static function perform($data, $post_type = 'post') {            
            $guid = $data[POST_DB_FIELDS::POST_GUID];
            $model = GetPostTypeTablePrefix::perform($post_type);
            $post = DB::table($model)->where(POST_DB_FIELDS::POST_GUID, $guid);
            $myPost = $post->get()->first();
            $post_url = GetUniqueSlug::perform($data[POST_DB_FIELDS::POST_URL], $myPost->post_url, $post_type);            
            $post->update([
                POST_DB_FIELDS::POST_TITLE => $data[POST_DB_FIELDS::POST_TITLE],
                POST_DB_FIELDS::POST_EXCERPT => $data[POST_DB_FIELDS::POST_EXCERPT],
                POST_DB_FIELDS::POST_URL => $post_url,
                POST_DB_FIELDS::POST_CONTENT => $data[POST_DB_FIELDS::POST_CONTENT],
                POST_DB_FIELDS::POST_AUTHOR => $data[POST_DB_FIELDS::POST_AUTHOR],
                POST_DB_FIELDS::POST_MODIFIED_DATE => date('Y-m-d H:i:s', time()),
            ]);
            if ( !empty($data[POST_DB_FIELDS::POST_CATEGORIES]) ) :
                ApiUpdatePostMetaField::perform($guid, POST_DB_FIELDS::POST_CATEGORIES, $data[POST_DB_FIELDS::POST_CATEGORIES], $post_type);
            else :
                ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_CATEGORIES, $post_type);
            endif;
            if ( !empty($data[POST_DB_FIELDS::POST_TAGS]) ) :
                ApiUpdatePostMetaField::perform($guid, POST_DB_FIELDS::POST_TAGS, $data[POST_DB_FIELDS::POST_TAGS], $post_type);
            else :
                ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_TAGS, $post_type);
            endif;
            if ( !empty($data[POST_DB_FIELDS::POST_THUMBNAIL]) ) :
                ApiUpdatePostMetaField::perform($guid, POST_DB_FIELDS::POST_THUMBNAIL, $data[POST_DB_FIELDS::POST_THUMBNAIL], $post_type, false);
            else :
                ApiRemovePostMetaField::perform($guid, POST_DB_FIELDS::POST_THUMBNAIL, $post_type);
            endif;
        }
    }