<?php  
    namespace App\Classes\Categories\b;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Models\GetTaxTablePrefix;
    use Illuminate\Support\Facades\DB;

    class GetTreeListsData {
        public static function getRowData($row, $meta_rows = []) {
            return [
                "name" => $row['name'],
                "value" => $row['guid'],
                "extras" => array_merge([
                    "id" => $row['guid'],
                    "name" => $row['name'],
                    "url" => $row['url'],
                    "description" => $row['description'],
                    "parent" => $row['parent']
                ], $meta_rows)
            ];
        }
        public static function getChildNodes($nodes, $n) {
            $data = [];
            foreach($nodes as $key => $node) :
                if ( $node['extras']['parent'] === $n['value'] ) :
                    $data [] = [
                        'index' => $key,
                        'value' => $node
                    ];
                endif;
            endforeach;
            return $data;
        }
        public static function travselNodesList(&$data, &$nodes) {
            foreach($data as $key => &$category) :
                $entryNodesData = self::getChildNodes($nodes, $category);
                if ( !empty( $entryNodesData ) ) :
                    if ( !array_key_exists('childrens', $category) ) :
                        $category['childrens'] = [];
                    endif;
                    foreach($entryNodesData as $k => $entryNode ) :
                        $category['childrens'][] = $entryNode['value'];
                        unset($nodes[$entryNode['index']]);
                    endforeach;
                endif;
                if ( array_key_exists('childrens', $category) && 
                        !empty($category['childrens']) ) :
                    self::travselNodesList($category['childrens'], $nodes);
                endif;
            endforeach;
        }
        public static function sort(&$data) {
            usort($data, function($r1, $r2) {
                $name1 = mb_strtolower($r1['name'], 'UTF-8');
                $name2 = mb_strtolower($r2['name'], 'UTF-8');
                return strcmp($name1, $name2);
            });  
            foreach($data as $key => &$row) :
                if ( array_key_exists('childrens', $row) && 
                        count($row['childrens']) > 0 ) :
                    self::sort($row['childrens']);
                endif;
            endforeach;
        }
        public static function perform($post_type = 'post', $tax = '', $istax = true) {
            $data = []; 
            $arrHasParents = [];
            $model = GetTaxTablePrefix::perform($post_type);
            $rows = DB::table($model)->select("*")->get()->toArray();
            usort($rows, function($r1, $r2) {
                $p1 = $r1->parent;
                $p2 = $r2->parent;
                if ( $p1 === $p2 ) return 0;
                return $p1 < $p2 ? -1 : 1;
            });
            foreach($rows as $key => $row) :
                $row = (array) $row;
                $parent = $row['parent'];
                $meta_rows = GetCategoryMetaData::perform($row[CATEGORY_DB_FIELDS::GUID], $post_type, $istax);
                if ( $parent === 0 ) :
                    $data[] = self::getRowData($row, $meta_rows);
                else :
                    $arrHasParents[] = self::getRowData($row, $meta_rows);
                endif;
            endforeach;
            self::travselNodesList($data, $arrHasParents);
            self::sort($data);
            return $data;
        }
    }