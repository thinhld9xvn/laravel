<?php 
    namespace App\Helpers\Profile\Api;
    use Illuminate\Http\Request;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\MetaRemoveUtils;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    class ApiRemoveMeta {
        public static function perform(Request $request, 
                                        $meta_name,                 
                                        $prefix = USER_DB_FIELDS::USERS_TABLE,
                                        $user = null) {
            $current_user = is_null($user) ? $request->user() : $user;
            $user_guid = $current_user[USER_DB_FIELDS::GUID];
            $result = MetaExistsUtils::has($meta_name, $user_guid, $prefix);   
            if ( $result["success"] ) :
                MetaRemoveUtils::perform($result['row'], $prefix);
            endif;
        }
    }