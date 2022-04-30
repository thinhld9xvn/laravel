<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\MetaStrings\b\InsertMetaUtils;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\MetaData\a\MetaData as META_DATA;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Posts\b\CheckPagesPostType;
    use App\Classes\Posts\b\GetUniqueId;
    use App\Classes\Posts\b\GetUniqueSlug;
    use Illuminate\Support\Facades\DB;
    class ApiCreatePost {
        public static function perform($data, $post_type = 'post') {
            $guid = GetUniqueId::perform($post_type);
            $isPagePt = CheckPagesPostType::perform($post_type);
            $model = GetPostTypeTablePrefix::perform($post_type);
            $post_url = GetUniqueSlug::perform($data[POST_DB_FIELDS::POST_URL], '', $post_type);
            $id = DB::table($model)->insertGetId([
                POST_DB_FIELDS::POST_GUID => $guid,
                POST_DB_FIELDS::POST_TITLE => $data[POST_DB_FIELDS::POST_TITLE],
                POST_DB_FIELDS::POST_URL => $post_url,
                POST_DB_FIELDS::POST_CONTENT => $data[POST_DB_FIELDS::POST_CONTENT],
                POST_DB_FIELDS::POST_EXCERPT => $data[POST_DB_FIELDS::POST_EXCERPT],
                POST_DB_FIELDS::POST_DATE => $data[POST_DB_FIELDS::POST_DATE],
                POST_DB_FIELDS::POST_MODIFIED_DATE => date('Y-m-d H:m:i', time()),
                POST_DB_FIELDS::POST_AUTHOR => $data[POST_DB_FIELDS::POST_AUTHOR],
                POST_DB_FIELDS::POST_STATUS => POST_DB_FIELDS::POST_PUBLIC
            ]);
            //
            if ( !$isPagePt ) :
                if ( !empty($data[POST_DB_FIELDS::POST_CATEGORIES]) ) :
                    $post_categories = $data[POST_DB_FIELDS::POST_CATEGORIES];
                    if ( !is_array($post_categories) ) :
                        $post_categories = json_decode($data[POST_DB_FIELDS::POST_CATEGORIES], true);
                    endif;
                    InsertMetaUtils::perform(POST_DB_FIELDS::POST_CATEGORIES, serialize($post_categories), 
                                                META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type);
                endif;
                if ( !empty($data[POST_DB_FIELDS::POST_TAGS]) ) :
                    $post_tags = $data[POST_DB_FIELDS::POST_TAGS];
                    if ( !is_array($post_tags) ) :
                        $post_tags = json_decode($data[POST_DB_FIELDS::POST_TAGS], true);
                    endif;
                    InsertMetaUtils::perform(POST_DB_FIELDS::POST_TAGS, serialize($post_tags), 
                                                META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type);
                endif;
            endif;
            if ( !empty($data[POST_DB_FIELDS::POST_THUMBNAIL]) ) :
                InsertMetaUtils::perform(POST_DB_FIELDS::POST_THUMBNAIL, $data[POST_DB_FIELDS::POST_THUMBNAIL], 
                                            META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type);
            endif;
            return [POST_DB_FIELDS::POST_GUID => $guid,
                    POST_DB_FIELDS::POST_ID => $id];
        }
    }