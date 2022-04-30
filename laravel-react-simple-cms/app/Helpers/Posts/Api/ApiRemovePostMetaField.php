<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\MetaRemoveUtils;
    class ApiRemovePostMetaField {
        public static function perform($guid, $key, $post_type = 'post') {
            $results = MetaExistsUtils::has($key, $guid, $post_type);
            if ( $results['success'] ) :
                MetaRemoveUtils::perform($results['row'], $post_type);
            endif;
            return true;
        }
    }