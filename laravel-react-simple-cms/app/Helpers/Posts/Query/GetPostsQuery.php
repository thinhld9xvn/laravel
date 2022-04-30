<?php
    namespace App\Helpers\Posts\Query;
    use Illuminate\Support\Facades\DB;
    class GetPostsQuery {
        private static function getQueryState($params) {
            extract($params);
            $query = DB::table($post_table)->join("users", "{$post_table}.post_author", "=", "users.guid")
                                        ->join("metadata", "metadata.owner_guid", "=", "{$post_table}.guid")
                                        ->join("meta_entity_objects", "metadata.entity_object_id", "=", "meta_entity_objects.guid")
                                        ->join("{$metastrings} as a", "a.id", "=", "metadata.name_id")
                                        ->join("{$metastrings} as b", "b.id", "=", "metadata.value_id")
                                        ->selectRaw("DISTINCT {$post_table}.id, {$post_table}.guid, 
                                                              post_title, post_date, post_author, 
                                                              post_status, b.string as post_categories, 
                                                              metadata.owner_guid, username, email");  
            if ( !empty($s) ) :
                $query = $query->whereRaw("MATCH({$post_table}.post_title) AGAINST('${s}')");
            endif;
            return $query->where([["meta_entity_objects.name", "=", $post_type],
                                    ["a.string", "REGEXP", "^_key_{$post_type}_[0-9]{1,}_post_categories$"]]);
        }
        public static function get($params) {
            extract($params);
            $query = self::getQueryState(['post_table' => $post_table, 'metastrings' => $metastrings, 's' => $s, 'post_type' => $post_type]);
            if ( count($where) > 0 ) :
                return $query->where($where)
                            ->whereBetween("post_date", $postDateBetween)
                            ->limit($posts_per_page)
                            ->offset($from)
                            ->orderBy($order, $order_by)
                            ->get()
                            ->toArray();
            endif;
            if (!empty($s)) :
                return $query->whereBetween("post_date", $postDateBetween)
                        ->limit($posts_per_page)
                        ->offset($from)
                        ->get()
                        ->toArray();
            endif;
            return $query->whereBetween("post_date", $postDateBetween)
                        ->limit($posts_per_page)
                        ->offset($from)
                        ->orderBy($order, $order_by)
                        ->get()
                        ->toArray();
        }
        public static function count($params) {
            extract($params);
            $query = self::getQueryState(['post_table' => $post_table, 'metastrings' => $metastrings, 's' => $s, 'post_type' => $post_type]);
            if ( count($where) > 0 ) :
                return $query->where($where)
                        ->whereBetween("post_date", $postDateBetween)
                        ->get()
                        ->count();
            endif;
            return $query->whereBetween("post_date", $postDateBetween)
                        ->get()
                        ->count();
        }
        public static function getNotBetweenPostDate($params) {
            extract($params);
            $query = self::getQueryState(['post_table' => $post_table, 'metastrings' => $metastrings, 's' => $s, 'post_type' => $post_type]);
            if ( count($where) > 0 ) :
                if ( !empty($s) ) :
                    return $query->where($where)
                             ->limit($posts_per_page)
                            ->offset($from)
                            ->get()
                            ->toArray();
                endif;                
                return $query->where($where)
                             ->limit($posts_per_page)
                            ->offset($from)
                            ->orderBy($order, $order_by)
                            ->get()
                            ->toArray();
            endif;
            if ( !empty($s) ) :
                return $query->limit($posts_per_page)                        
                        ->offset($from)
                        ->get()
                        ->toArray();
            endif;
            return $query->limit($posts_per_page)                        
                        ->offset($from)
                        ->orderBy($order, $order_by)
                        ->get()
                        ->toArray();
        }   
        public static function countNotBeetweenPostDate($params) {
            extract($params);
            $query = self::getQueryState(['post_table' => $post_table, 'metastrings' => $metastrings, 's' => $s, 'post_type' => $post_type]);
            if ( count($where) > 0 ) :
                return $query->where($where)
                         ->get()
                         ->count();
            endif;
            return $query->get()
                         ->count();
        }
    }