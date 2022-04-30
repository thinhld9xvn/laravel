<?php  
    namespace App\Classes\Categories\b;
    use App\Classes\Categories\b\metadata\GetCategoryThumbnailMetaData;
    class GetCategoryMetaData {
        public static function perform($guid, $post_type = 'post', $istax = true) {
            $results = [];
            $thumbnail = GetCategoryThumbnailMetaData::perform($guid, $post_type, $istax);
            if ( !empty($thumbnail) ) :
                $results['thumbnail'] = $thumbnail;
            endif;
            return $results;
        }
    }