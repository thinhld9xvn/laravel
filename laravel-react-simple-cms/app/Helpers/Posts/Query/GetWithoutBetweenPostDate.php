<?php
    namespace App\Helpers\Posts\Query;
    class GetWithoutBetweenPostDate {
        public static function perform($params) {
            extract($params);
            $data = GetPostsQuery::getNotBetweenPostDate(['post_table' => $post_table, 
                                                            'metastrings' => $metastrings,
                                                            'where' => $where,
                                                            'posts_per_page' => $posts_per_page,
                                                            'from' => $from,
                                                            'order' => $order,
                                                            'order_by' => $order_by,
                                                            's' => $s,
                                                            'post_type' => $post_type]);
            $count = GetPostsQuery::countNotBeetweenPostDate(['post_table' => $post_table, 
                                                                'metastrings' => $metastrings,
                                                                'where' => $where,
                                                                's' => $s, 
                                                                'post_type' => $post_type]);
            return [
                $data, 
                $count
            ];
        }
    }