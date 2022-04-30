<?php  
    namespace App\Classes\Tags\b;
    use App\Models\Tags;
    class UpdateTreeListsData {
        public static function perform($data, $post_type = 'post') {
            foreach($data as $key => $tag) :
                $guid = (int) $tag['value'];
                $row = Tags::where('guid', $guid)->get()->toArray();
                if ( empty($row) ) :                      
                    CreateNodeData::perform($tag);
                else :
                    $row = $row[0];
                    UpdateNodeData::perform($row, $tag);
                endif;
            endforeach;
        }
    }