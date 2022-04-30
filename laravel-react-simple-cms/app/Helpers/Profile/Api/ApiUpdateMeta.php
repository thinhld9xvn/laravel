<?php 
    namespace App\Helpers\Profile\Api;
    use App\Classes\MetaStrings\b\InsertMetaUtils;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\UpdateMetaUtils;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    class ApiUpdateMeta {
        public static function perform($request, 
                                        $meta_name, 
                                        $meta_value,                                        
                                        $prefix = USER_DB_FIELDS::USERS_TABLE,
                                        $user = null) {
            $current_user = is_null($user) ? $request->user() : $user;
            $user_guid = $current_user[USER_DB_FIELDS::GUID];
            $result = MetaExistsUtils::has($meta_name, $user_guid, $prefix);   
            if ( $result["success"] ) :
                UpdateMetaUtils::perform($result['row'], $meta_value, $prefix);
            else :
                $meta_type = 'text';
                if ( in_array($meta_name, [USER_DATA_FIELDS::USER_ROLE_ID,
                                            USER_DATA_FIELDS::USER_IS_ONLINE,
                                            USER_DATA_FIELDS::USER_AGE])) :               
                    $meta_type = 'integer';
                endif;
                InsertMetaUtils::perform($meta_name, $meta_value, $meta_type, $user_guid, $prefix);
            endif;
        }
    }