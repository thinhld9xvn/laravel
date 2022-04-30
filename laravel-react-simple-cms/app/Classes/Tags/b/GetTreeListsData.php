<?php  
    namespace App\Classes\Tags\b;
    use App\Models\Tags;
    class GetTreeListsData {
        public static function getRowData($row) {
            return [
                "name" => $row['name'],
                "value" => $row['guid'],
                "extras" => [
                    "id" => $row['guid'],
                    "name" => $row['name'],
                    "url" => $row['url'],
                    "description" => $row['description']
                ]
            ];
        }
        public static function perform($post_type = 'post') {
            $data = [];
            $rows = Tags::get()->toArray();            
            foreach($rows as $key => $row) :
                $data[] = self::getRowData($row);
            endforeach;
            return $data;
        }
    }