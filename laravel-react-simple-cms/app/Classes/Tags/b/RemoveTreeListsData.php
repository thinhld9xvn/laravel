<?php  
    namespace App\Classes\Tags\b;
    use App\Models\Tags;
    use App\Classes\Tags\a\TagDBFields as TAG_DB_FIELDS;
    class RemoveTreeListsData {
        public static function perform($ids, $post_type = 'post') {
            foreach($ids as $key => $id) :
               $row = Tags::where(TAG_DB_FIELDS::GUID, $id);
               $row->delete();
            endforeach;
        }
    }