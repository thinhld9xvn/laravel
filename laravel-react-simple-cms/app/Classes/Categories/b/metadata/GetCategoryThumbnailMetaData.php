<?php  
    namespace App\Classes\Categories\b\metadata;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\Utils\FileUtils;
    use Illuminate\Support\Facades\DB;
    class GetCategoryThumbnailMetaData {
        public static function perform($guid, $post_type = 'post', $istax = true) {
            $model = GetMetaStrTableUtils::perform($post_type, $istax);
            $results = MetaExistsUtils::has(CATEGORY_DB_FIELDS::THUMBNAIL, $guid, $post_type, $istax);
            if ( $results['success'] ) :
                $row = $results['row'];
                $metaRow = DB::table($model)->where(META_STRINGS_DB_FIELDS::ID, 
                                           $row[META_DB_FIELDS::VALUE_ID])->get()->first();
                return FileUtils::getUploadFileUrl($metaRow->string);
            endif;
            return false;
        }
    }