<?php 
    namespace App\Helpers\Posts\Api;
    use App\Classes\MetaStrings\b\InsertMetaUtils;
    use App\Classes\MetaData\a\MetaData as META_DATA;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\UpdateMetaUtils;
    class ApiUpdatePostMetaField {
        public static function perform($guid, $key, $value, $post_type = 'post', $serialized = true) {
            $results = MetaExistsUtils::has($key, $guid, $post_type);
            $value = $serialized ? serialize($value) : $value;
            if ( $results['success'] ) :
                UpdateMetaUtils::perform($results['row'], $value, $post_type);
            else :
                InsertMetaUtils::perform($key, $value, 
                                            META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type);
            endif;
            return true;
        }
    }