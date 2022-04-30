<?php
    namespace App\Helpers\Posts\Query;
    class GetBetweenPostDate {
        public static function perform($params) {
            extract($params);
            $data = GetPostsQuery::get(['post_table' => $post_table, 
                                        'metastrings' => $metastrings,
                                        'where' => $where,
                                        'posts_per_page' => $posts_per_page,
                                        'postDateBetween' => $postDateBetween,
                                        'from' => $from,
                                        'order' => $order,
                                        'order_by' => $order_by,
                                        's' => $s,
                                        'post_type' => $post_type]);
            $count = GetPostsQuery::count(['post_table' => $post_table, 
                                            'metastrings' => $metastrings,
                                            'where' => $where,
                                            'postDateBetween' => $postDateBetween,
                                            's' => $s, 
                                            'post_type' => $post_type]);
            return [
                $data, 
                $count
            ];
        }
    }