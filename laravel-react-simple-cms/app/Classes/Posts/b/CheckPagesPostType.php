<?php 
    namespace App\Classes\Posts\b;
    class CheckPagesPostType {
        public static function perform($post_type) {
            return $post_type === 'page';
        }
    }