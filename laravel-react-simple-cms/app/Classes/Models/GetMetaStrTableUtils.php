<?php  
    namespace App\Classes\Models;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    use App\Classes\Utils\StringsUtils;
    class GetMetaStrTableUtils {
        public static function perform($name, $istax = false) {
            $key = '_metastrings';
            $pos = strpos($name, $key);
            if ( $pos !== FALSE ) :
                $name = substr($name, 0, $pos);
            endif;
            if ( $name === 'post' ) :
                $name = $istax ? CATEGORY_DATA_FIELDS::CATEGORY_PREFIX :
                                POST_DATA_FIELDS::POST_PREFIX;
            endif;
            if ( $name === 'page' ) :
                $name = POST_DATA_FIELDS::PAGE_PREFIX;
            endif;
            return StringsUtils::ConvertSlugToName($name) . '_metastrings';
        }
    }   