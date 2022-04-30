<?php 
    namespace App\Classes\Utils\Folders;
    class GetDirInfoUtils {
        public static function perform($data) {
            extract($data);
            return array(
                'name' => $name,
                'path' => $path,
                'old_path' => '',
                'new_path' => '',
                'alias' => $name,
                'active' => false,
                'edit_mode' => false,
                'disabled' => false,
                'children' => array()
            );
        }
    }