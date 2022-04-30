<?php 
    namespace App\Helpers\PostTypes\Api;
    use App\Classes\Options\a\OptionsData as OPTIONS_DATA;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELDS;
    use App\Classes\Utils\SchemaUtils;
    use App\Models\Options;
    class ApiRemovePostType {
        public static function perform(Array $data, String $action = POST_DATA_FIELDS::TRASH_ACTION) {
            $option = ApiGetPostTypesList::perform();
            if ( is_null($option) ) return false;
            $isTrashAction = $action === POST_DATA_FIELDS::TRASH_ACTION;
            $isRemovePermantlyAction = $action === POST_DATA_FIELDS::REMOVE_PERMANTLY_ACTION;
            //
            foreach($option as $key => &$post_type) :
                $id = $post_type[POST_DATA::PT_OPTION_ID];
                if ( FALSE !== array_search($id, $data) ) :
                    if ( $isTrashAction ) :
                        $post_type[POST_DATA::PT_OPTION_STATUS] = $action;
                    endif;
                    if ( $isRemovePermantlyAction ) :
                        $post_type = $option[$key][POST_DATA::PT_OPTION_SLUG];
                        SchemaUtils::dropPostTypeTables($post_type);
                        unset($option[$key]);
                    endif;
                endif;
            endforeach;
            if ( count($option) > 0 ) : 
                Options::where(OPTIONS_DATA::OPTION_NAME, OPTIONS_DATA::POST_TYPES_OPTION)
                        ->update([OPTIONS_DATA::OPTION_VALUE => serialize($option)]);
            else :
                Options::where(OPTIONS_DATA::OPTION_NAME, OPTIONS_DATA::POST_TYPES_OPTION)
                        ->delete();
            endif;
            return true;
        }
    }