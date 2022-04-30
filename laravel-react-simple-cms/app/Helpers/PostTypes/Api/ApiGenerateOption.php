<?php 
    namespace App\Helpers\PostTypes\Api;
    use App\Classes\Posts\a\PostData as POST_DATA;
    class ApiGenerateOption {
        public static function perform($params) {
            extract($params);
            return [
                POST_DATA::PT_OPTION_ID => $id,
                POST_DATA::PT_OPTION_SLUG => $slug,
                POST_DATA::PT_OPTION_NAME => $name,
                POST_DATA::PT_OPTION_LABEL => $label,
                POST_DATA::PT_OPTION_ALL_POSTS_LABEL => $all_posts_label,
                POST_DATA::PT_OPTION_NEW_POST_LABEL => $new_post_label,
                POST_DATA::PT_OPTION_POST_NAME_LABEL => $post_name_label,
                POST_DATA::PT_OPTION_PUBLISH_POST_LABEL => $publish_post_label,
                POST_DATA::PT_OPTION_DESCRIPTION => $description,
                POST_DATA::PT_OPTION_TAXONOMIES => $taxonomies,
                POST_DATA::PT_OPTION_STATUS => $status,
                POST_DATA::PT_OPTION_TEMPLATE => null
            ];
        }
    }