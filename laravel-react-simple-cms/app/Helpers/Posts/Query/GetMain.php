<?php
    namespace App\Helpers\Posts\Query;
    use App\Classes\Posts\b\metadata\GetPostFieldMeta;
    use App\Classes\Posts\b\metadata\ParseCTypeMeta;
    use App\Classes\Posts\b\metadata\ParseThumbnailMeta;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Classes\Users\b\GetFieldMeta as GetUserFieldMeta;
    use App\Classes\Utils\DateTimeUtils;
    use App\Classes\Posts\a\PostData as POST_DATA;
    class GetMain {
        private static $post_type;
        private static function map_callback($post) {
            $post = (array) $post;
            $guid = $post[POST_DATA::POST_GUID];
            $post_author = $post[POST_DATA::POST_AUTHOR];
            $post[POST_DATA::POST_DATE] = DateTimeUtils::convert_str($post[POST_DATA::POST_DATE]);
            $post[USER_DATA_FIELDS::USER_DISPLAY_NAME] = GetUserFieldMeta::perform(USER_DATA_FIELDS::USER_DISPLAY_NAME, $post_author, USER_DB_FIELDS::USERS_TABLE);
            $post[POST_DATA::POST_THUMBNAIL] = ParseThumbnailMeta::perform(GetPostFieldMeta::perform($guid, POST_DATA::POST_THUMBNAIL, self::$post_type));
            $post[POST_DATA::POST_CATEGORIES] = ParseCTypeMeta::perform(GetPostFieldMeta::perform($guid, POST_DATA::POST_CATEGORIES, self::$post_type));                  
            return $post;
        }
        public static function perform($params) {
            extract($params);
            $data = [];
            $count = 0;
            $s = '';
            self::$post_type = $post_type;
            if ( !is_null($filtered_params) ) :
                extract($filtered_params);
            endif;
            $my_params = ['post_table' => $post_table, 
                            'post_type' => $post_type,
                            'metastrings' => $metastrings,
                            'where' => $where,
                            'posts_per_page' => $posts_per_page,
                            'from' => $from,
                            'order' => $order,
                            'order_by' => $order_by,
                            's' => $s];
            if ( !is_null($filtered_params) ) :
                if ( $authorId !== -1 ) :
                    $where[] = ["{$post_table}.post_author", "=", $authorId];
                endif;
                if ( $categoryId !== -1 ) :
                    $where[] = ["b.string", "LIKE", "%:{$categoryId};%"];
                endif;
                //
                $my_params['where'] = $where;
                //
                if ( $postModifiedFilter !== '-1') :
                    $postDateBetween = null;
                    $now = date('Y-m-d', time());
                    $seven_day_ago = date('Y-m-d', time() - 7*ONE_DAY_MILLISECONDS);
                    $year = date('Y', time());
                    $month = date('m', time());
                    if ( $postModifiedFilter === POST_DATA::FILTER_BY_DATE_NOW ) :
                        $postDateBetween = ["{$now} 00:00:00", "{$now} 23:59:59"];                        
                    endif;
                    if ( $postModifiedFilter === POST_DATA::FILTER_BY_SEVEN_DAYS_AGO ) :
                        $postDateBetween = ["{$seven_day_ago} 00:00:00", "{$now} 23:59:59"];
                    endif;
                    if ( $postModifiedFilter === POST_DATA::FILTER_BY_THIS_MONTH ) :
                        $postDateBetween = ["${year}-${month}-01 00:00:00", "{$now} 23:59:59"];
                    endif;
                    if ( !is_null($postDateBetween) ) :
                        $my_params['postDateBetween'] = $postDateBetween;
                        list($data, $count) = GetBetweenPostDate::perform($my_params);
                    else :            
                        list($data, $count) = GetWithoutBetweenPostDate::perform($my_params);
                    endif;
                else :
                    list($data, $count) = GetWithoutBetweenPostDate::perform($my_params);
                endif;
            else :
                list($data, $count) = GetWithoutBetweenPostDate::perform($my_params);               
            endif;           
            $posts_data = [$data, $count];
            $arrSortedPosts = [];
            $arrUnsortPosts = [];
            foreach($posts_data[0] as $key => $post) :
                $post = (array) $post;
                if ( $s ) :
                    $post_title = implode(' ', array_map('mb_strtolower', explode(' ', $post[POST_DATA::POST_TITLE])));
                    $keywords = implode(' ', array_map('mb_strtolower', explode(' ', $s)));
                    $pos = mb_strpos($post_title, $keywords, 0, 'UTF-8');
                    if ( FALSE !== $pos ) :
                        $post['pos'] = $pos;
                        $arrSortedPosts[] = $post;
                    else :
                        $arrUnsortPosts[] = $post;
                    endif;
                else :
                    $arrSortedPosts[] = $post;
                endif;
            endforeach;     
            if ( $s ) :
                usort($arrSortedPosts, function($p1, $p2) {
                    $pos1 = $p1['pos'];
                    $pos2 = $p2['pos'];
                    if ( $pos1 === $pos2 ) return 0;
                    return $pos1 < $pos2 ? -1 : 1;
                });
            endif;        
            $arrSortedPosts = array_merge($arrSortedPosts, $arrUnsortPosts);
            $posts_data[0] = array_map('self::map_callback', $arrSortedPosts);
            return $posts_data;
        }
    }