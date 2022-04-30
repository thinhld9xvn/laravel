<?php  
    namespace App\Classes\Categories\b;
    use App\Models\Categories;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\MetaData\a\MetaData as META_DATA;
    use App\Classes\MetaStrings\b\InsertMetaUtils;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Utils\FileUtils;
    use Illuminate\Support\Facades\DB;
    class CreateNodeData {
        public static function perform($data, $post_type = 'post', $tax = CATEGORY_DATA_FIELDS::CATEGORY_PREFIX, $istax = true) {
            $model = GetTaxTablePrefix::perform($post_type, $istax);
            $atts = $data['extras'];
            $thumbnail = array_key_exists(CATEGORY_DB_FIELDS::THUMBNAIL, $atts) ? $atts[CATEGORY_DB_FIELDS::THUMBNAIL] : '';    
            $subthumbnail = '';
            if ( !empty($thumbnail) ) :
                $subthumbnail = FileUtils::getSubDirFileFromUrl($thumbnail);
            endif;          
            $guid = (int) $data['value'];
            $fields = [
                CATEGORY_DB_FIELDS::GUID => $guid,
                CATEGORY_DB_FIELDS::NAME => $atts[CATEGORY_DB_FIELDS::NAME],
                CATEGORY_DB_FIELDS::URL => $atts[CATEGORY_DB_FIELDS::URL],
                CATEGORY_DB_FIELDS::PARENT => $atts[CATEGORY_DB_FIELDS::PARENT],
                CATEGORY_DB_FIELDS::DESCRIPTION => $atts[CATEGORY_DB_FIELDS::DESCRIPTION]
            ];
            if ( $model !== CATEGORY_DATA_FIELDS::CATEGORY_PREFIX ) :
                $fields[CATEGORY_DB_FIELDS::TAX_SLUG] = $tax;
            endif;
            DB::table($model)->insert($fields);
            if ( !empty($thumbnail) ) :
                InsertMetaUtils::perform(CATEGORY_DB_FIELDS::THUMBNAIL, $subthumbnail, META_DATA::DEFAULT_VALUE_TYPE, $guid, $post_type, $istax);
            endif;
        }
    }