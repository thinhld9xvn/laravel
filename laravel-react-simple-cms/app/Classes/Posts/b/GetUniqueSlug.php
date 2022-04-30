<?php 
    namespace App\Classes\Posts\b;
    class GetUniqueSlug {
        public static function perform($slug, $old = '', $post_type = 'post') {
            $allSlugs = GetRelatedSlugs::perform($slug, !empty($old) ? [$old] : [], $post_type);
            if (! $allSlugs->contains('post_url', $slug)){
                return $slug;
            }
            $i = 1;
            $is_contain = true;
            do {
                $newSlug = $slug . '-' . $i;
                if (!$allSlugs->contains('post_url', $newSlug)) {
                    $is_contain = false;
                    return $newSlug;
                }
                $i++;
            } while ($is_contain);
        }
    }