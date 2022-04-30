<?php 
    namespace App\Helpers\PostTypes\Api;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    class ApiGetParameters {
        public static function perform(Request $request) {
            $data = json_decode($request->input( POST_DATA::POST_TYPE_DATA), true);
            $id = $data[POST_DATA::PR_POST_TYPE_ID];
            $name = $data[POST_DATA::PR_POST_TYPE_NAME];
            $slug = $data[POST_DATA::PR_POST_TYPE_SLUG];
            $description = $data[POST_DATA::PR_POST_TYPE_DESCRIPTION];
            $label = $data[POST_DATA::PR_POST_TYPE_LABEL];
            $all_posts_label = $data[POST_DATA::PR_ALL_POSTS_LABEL];
            $new_post_label = $data[POST_DATA::PR_NEW_POST_LABEL];
            $post_name_label = $data[POST_DATA::PR_POST_NAME_LABEL];
            $publish_post_label = $data[POST_DATA::PR_PUBLISH_POST_LABEL];
            $status = $data[POST_DATA::PR_STATUS];
            $tax_lists = $data[POST_DATA::PR_TAX_LISTS];
            return [POST_DATA::PT_OPTION_ID => $id, 
                    POST_DATA::PT_OPTION_NAME => $name, 
                    POST_DATA::PT_OPTION_SLUG => $slug,
                    POST_DATA::PT_OPTION_DESCRIPTION => $description,
                    POST_DATA::PT_OPTION_LABEL => $label,
                    POST_DATA::PT_OPTION_ALL_POSTS_LABEL => $all_posts_label,
                    POST_DATA::PT_OPTION_NEW_POST_LABEL => $new_post_label,
                    POST_DATA::PT_OPTION_POST_NAME_LABEL => $post_name_label,
                    POST_DATA::PT_OPTION_PUBLISH_POST_LABEL => $publish_post_label,
                    POST_DATA::PT_OPTION_STATUS => $status,
                    POST_DATA::PT_OPTION_TAXONOMIES => $tax_lists
            ];
        }
    }