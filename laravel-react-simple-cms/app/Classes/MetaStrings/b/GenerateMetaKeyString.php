<?php  
    namespace App\Classes\MetaStrings\b;
    class GenerateMetaKeyString {
        public static function perform($name, $guid, $prefix) {
            return "_key_{$prefix}_{$guid}_{$name}";
        }
    }