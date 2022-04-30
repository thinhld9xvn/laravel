<?php 
    namespace App\Helpers\Posts;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDBFields as POST_DB_FIELDS;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\Posts\Query\GetMain;
    use Illuminate\Support\Facades\Validator;
    define('ONE_DAY_MILLISECONDS', 24*3600);
    class GetPostsListHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                POST_DATA::POST_TYPE => 'required'
            ]);
            if ( $validator->fails() ) :
                return ResponseUtils::error($validator->errors()->all());
            endif;
            $post_status = $request->input(POST_DB_FIELDS::POST_STATUS);
            $post_status = !empty($post_status) ? $post_status : POST_DATA::POST_PUBLIC;
            $isGetAll = $post_status === 'all';
            //
            $filtered_params = $request->input(POST_DATA::FILTERED_PARAMS);
            $filtered_params = !empty($filtered_params) ? json_decode($filtered_params, true) : null;
            //
            $paged = $request->input(POST_DATA::PAGED);
            $paged = !empty($paged) ? (int) $paged : 1;
            //
            $posts_per_page = $request->input(POST_DATA::NUM_PER_PAGE);
            $posts_per_page = !empty($posts_per_page) ? (int) $posts_per_page : 10;
            //
            $order = $request->input(POST_DATA::ORDER);
            $order_by = $request->input(POST_DATA::ORDER_BY);
            //
            $from = ($paged - 1) * $posts_per_page;
            //$to = $paged * $posts_per_page;
            //
            $post_type = $request->input(POST_DATA::POST_TYPE);
            $post_table = GetPostTypeTablePrefix::perform($post_type);
            $metastrings = GetMetaStrTableUtils::perform($post_type);            
            $posts_data = [
                'data' => [],
                'count' => 0
            ];
            if ( $isGetAll ) :
                $posts_data = [
                    POST_DATA::POST_PUBLIC => [
                        'data' => [],
                        'count' => 0
                    ],
                    POST_DATA::POST_TRASH => [
                        'data' => [],
                        'count' => 0
                    ]
                ];
            endif;
            $where = [["{$post_table}.post_status", "=", $post_status]];
            $params = ['post_table' => $post_table, 
                        'post_type' => $post_type,
                        'metastrings' => $metastrings,
                        'where' => null,
                        'posts_per_page' => $posts_per_page,
                        'from' => $from,
                        'order' => $order,
                        'order_by' => $order_by,
                        'filtered_params' => $filtered_params];
            if ( $isGetAll ) :
                $public_where = [["{$post_table}.post_status", "=", POST_DATA::POST_PUBLIC]];
                $trash_where = [["{$post_table}.post_status", "=", POST_DATA::POST_TRASH]];     
                //
                $params['where'] = $public_where;           
                list($public_posts_list, $public_count) = GetMain::perform($params);
                //
                $params['where'] = $trash_where;
                list($trash_posts_list, $trash_count) = GetMain::perform($params);
                //
                $posts_data[POST_DATA::POST_PUBLIC] = ['data' => $public_posts_list, 'count' => $public_count];
                $posts_data[POST_DATA::POST_TRASH] = ['data' => $trash_posts_list, 'count' => $trash_count];
                //
                return ResponseUtils::success($posts_data);
            endif;
            //
            $params['where'] = $where;   
            list($data, $count) = GetMain::perform($params);
            $posts_data['data'] = $data;
            $posts_data['count'] = $count;
            //
            return ResponseUtils::success($posts_data);
        }
    }