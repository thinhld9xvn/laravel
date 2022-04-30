<?php  
    namespace App\Classes\Categories\b\metadata;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\MetaStrings\b\MetaRemoveUtils;
    class RemoveCategoryThumbnailMetaData {
        public static function perform($guid, $post_type = 'post', $istax = true) {
            $results = MetaExistsUtils::has(CATEGORY_DB_FIELDS::THUMBNAIL, $guid, $post_type, $istax);
            if ( $results['success'] ) :
                $row = $results['row'];
                MetaRemoveUtils::perform($row, $post_type, $istax);
            endif;
            return true;
        }
    }