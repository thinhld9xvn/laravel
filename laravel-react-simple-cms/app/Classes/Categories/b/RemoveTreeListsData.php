<?php  
    namespace App\Classes\Categories\b;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Categories\b\metadata\RemoveCategoryThumbnailMetaData;
    use App\Classes\Models\GetTaxTablePrefix;
    use Illuminate\Support\Facades\DB;
    class RemoveTreeListsData {
        public static function perform($ids, $post_type = 'post', $tax = CATEGORY_DATA_FIELDS::CATEGORY_PREFIX, $istax = true) {
            $model = GetTaxTablePrefix::perform($post_type);
            foreach($ids as $key => $id) :
               RemoveCategoryThumbnailMetaData::perform($id, $post_type, $istax);
               $row = DB::table($model)->where(CATEGORY_DB_FIELDS::GUID, $id);
               $row->delete();
            endforeach;
        }
    }