<?php  
    namespace App\Classes\Posts\b\metadata;
    class ParseCTypeMeta {
        public static function perform($value) {
            if ( !$value ) return null;
            $value = unserialize($value);
            if ( is_array($value) ) :
                return $value;
            endif;
            return json_decode($value, true);
        }
    }