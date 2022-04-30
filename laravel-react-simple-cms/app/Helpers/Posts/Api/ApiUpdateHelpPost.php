<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    class ApiUpdateHelpPost {
        public static function perform($data, $post_type = 'post', $action = POST_DATA_FIELDS::POST_NEW_ACTION) {
            if ( $action === POST_DATA_FIELDS::POST_NEW_ACTION ) :
                return ApiCreatePost::perform($data, $post_type);
            endif;
            if ( $action === POST_DATA_FIELDS::POST_UPDATE_ACTION ) :
                return ApiUpdatePost::perform($data, $post_type);
            endif;
        }
    }