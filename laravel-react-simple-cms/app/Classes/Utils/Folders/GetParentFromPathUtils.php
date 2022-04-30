<?php 
    namespace App\Classes\Utils\Folders;
    class GetParentFromPathUtils {
        public static function perform($path) {
            $splices = explode('/', $path);
            array_pop( $splices );
            $parent = implode('/', $splices);
            return empty( $parent ) ? '/' : $parent;  
        }
    }