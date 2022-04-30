<?php  
    namespace App\Classes\MetaStrings\b;
    class ParseMetaStringValue {
        public static function perform($value) {
            return !is_null($value) && false !== $value ? $value : '';
        }
    }