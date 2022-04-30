<?php  
    namespace App\Classes\Posts\b\metadata;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Posts\b\CheckPagesPostType;
    use App\Classes\Posts\b\metadata\GetPostFieldMeta;
    class GetPostMeta {
        public static function perform($guid, $post_type = 'post') {
            $meta = [POST_DB_FIELDS::POST_THUMBNAIL => ParseThumbnailMeta::perform(GetPostFieldMeta::perform($guid, POST_DB_FIELDS::POST_THUMBNAIL, $post_type))];
            if ( !CheckPagesPostType::perform($post_type) ) :
                $meta[POST_DB_FIELDS::POST_CATEGORIES] = ParseCTypeMeta::perform(GetPostFieldMeta::perform($guid, POST_DB_FIELDS::POST_CATEGORIES, $post_type));
                $meta[POST_DB_FIELDS::POST_TAGS] = ParseCTypeMeta::perform(GetPostFieldMeta::perform($guid, POST_DB_FIELDS::POST_TAGS, $post_type));
            endif;
            return $meta;
        }
    }