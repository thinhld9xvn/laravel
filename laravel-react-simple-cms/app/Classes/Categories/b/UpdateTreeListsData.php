<?php  
    namespace App\Classes\Categories\b;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use Illuminate\Support\Facades\DB;
    class UpdateTreeListsData {
        public static function perform($data, $post_type = 'post', $tax = CATEGORY_DATA_FIELDS::CATEGORY_PREFIX) {
            $model = GetTaxTablePrefix::perform($post_type);
            foreach($data as $key => $category) :
                $guid = (int) $category['value'];
                $row = (array) DB::table($model)->where('guid', $guid)->get()->first();
                if ( empty($row) ) :                      
                    CreateNodeData::perform($category, $post_type, $tax);
                else :
                    UpdateNodeData::perform($row, $category, $post_type, $tax);
                endif;
                if ( array_key_exists('childrens', $category) && 
                    !empty($category['childrens']) ) :
                    self::perform($category['childrens'], $post_type, $tax);
                endif;
            endforeach;
        }
    }