<?php  
    namespace App\Classes\Categories\b;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\MetaData\a\MetaData as META_DATA;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\MetaStrings\b\InsertMetaUtils;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\MetaRemoveUtils;
    use App\Classes\MetaStrings\b\UpdateMetaUtils;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Utils\FileUtils;
    use Illuminate\Support\Facades\DB;
    class UpdateNodeData {
        public static function perform($row, $cat, $post_type = 'post', $tax = CATEGORY_DATA_FIELDS::CATEGORY_PREFIX, $istax = true) {
            $model = GetTaxTablePrefix::perform($post_type);
            $data = $cat['extras'];
            $thumbnail = array_key_exists(CATEGORY_DB_FIELDS::THUMBNAIL, $data) ? $data[CATEGORY_DB_FIELDS::THUMBNAIL] : '';    
            $subthumbnail = '';
            if ( !empty($thumbnail) ) :
                $subthumbnail = FileUtils::getSubDirFileFromUrl($thumbnail);
            endif;
            $id = $row[CATEGORY_DB_FIELDS::ID];
            $guid = $row[CATEGORY_DB_FIELDS::GUID];
            //
            DB::table($model)->where('id', $id)->update([
                CATEGORY_DB_FIELDS::NAME => $data[CATEGORY_DB_FIELDS::NAME],
                CATEGORY_DB_FIELDS::DESCRIPTION => $data[CATEGORY_DB_FIELDS::DESCRIPTION],
                CATEGORY_DB_FIELDS::URL => $data[CATEGORY_DB_FIELDS::URL],
                CATEGORY_DB_FIELDS::PARENT => $data[CATEGORY_DB_FIELDS::PARENT]
            ]);
            //           
            $results = MetaExistsUtils::has(CATEGORY_DB_FIELDS::THUMBNAIL, $guid, $post_type, $istax);
            $metastringsModel = GetMetaStrTableUtils::perform($post_type, $istax);
            if ( $results['success'] ) :
                $row = $results['row'];
                if (empty($thumbnail) ) :
                    MetaRemoveUtils::perform($row, $post_type, $istax);
                    return;
                endif;  
                $metaRow = DB::table($metastringsModel)->where(META_STRINGS_DB_FIELDS::ID, 
                                                                $row[META_DB_FIELDS::VALUE_ID])
                                                       ->get()->first();
                if ( $metaRow->string !== $subthumbnail ) :
                    UpdateMetaUtils::perform($row, $subthumbnail, $post_type, $istax);
                endif;
            else :
                if ( !empty($thumbnail) ) :
                    InsertMetaUtils::perform(CATEGORY_DB_FIELDS::THUMBNAIL, $subthumbnail, META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type, $istax);
                endif;
            endif;
        }
    }