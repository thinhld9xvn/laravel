<?php 
    namespace App\Classes\Utils;
    class StringsUtils {
        public static function ConvertSlugToName($slug) {
            return preg_replace("/\-/", "_", $slug);
        }
    }