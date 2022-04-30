<?php  
    namespace App\Classes\Models;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Utils\StringsUtils; 
    class GetTaxTablePrefix {
        public static function perform($name) {
            $key = '_taxonomies';
            $pos = strpos($name, $key);
            if ( $pos !== FALSE ) :
                $name = substr($pos, 0, $pos);
            endif;
            if ( $name === 'post' ) :
                return CATEGORY_DATA_FIELDS::CATEGORY_PREFIX;
            endif;            
            return StringsUtils::ConvertSlugToName($name) . '_taxonomies';
        }        
    }