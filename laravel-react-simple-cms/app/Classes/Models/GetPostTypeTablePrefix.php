<?php 
    namespace App\Classes\Models;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    use App\Classes\Utils\StringsUtils;
    class GetPostTypeTablePrefix {
        public static function perform($name) {
            $key = '_posts';
            $pos = strpos($name, $key);
            if ( $pos !== FALSE ) :
                $name = substr($pos, 0, $pos);
            endif;
            if ( $name === 'post' ) :
                return POST_DATA_FIELDS::POST_PREFIX;
            endif;
            if ( $name === 'page' ) :
                return POST_DATA_FIELDS::PAGE_PREFIX;
            endif;            
            return StringsUtils::ConvertSlugToName($name) . $key;
        }
    }