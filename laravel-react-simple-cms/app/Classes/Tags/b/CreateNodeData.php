<?php  
    namespace App\Classes\Tags\b;
    use App\Models\Tags;
    use App\Classes\Tags\a\TagDBFields as TAG_DB_FIELDS;
    use App\Classes\Tags\a\TagDataFields as TAG_DATA_FIELDS;
    class CreateNodeData {
        public static function perform($data) {
            $atts = $data['extras'];
            $tag = new Tags;
            $guid = (int) $data['value'];
            $tag->guid = $guid;     
            $tag->name = $atts[TAG_DB_FIELDS::NAME];
            $tag->url = $atts[TAG_DB_FIELDS::URL];
            $tag->description = $atts[TAG_DB_FIELDS::DESCRIPTION];
            $tag->save();
        }
    }