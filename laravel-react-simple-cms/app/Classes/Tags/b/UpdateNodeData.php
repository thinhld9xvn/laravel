<?php  
    namespace App\Classes\Tags\b;
    use App\Classes\Tags\a\TagDBFields as TAG_DB_FIELDS;
    use App\Models\Tags;
    class UpdateNodeData {
        public static function perform($row, $cat) {
            $data = $cat['extras'];
            $id = $row[TAG_DB_FIELDS::ID];
            $row = Tags::find($id);
            $row->name = $data[TAG_DB_FIELDS::NAME];
            $row->description = $data[TAG_DB_FIELDS::DESCRIPTION];
            $row->url = $data[TAG_DB_FIELDS::URL];    
            $row->save(); 
        }
    }