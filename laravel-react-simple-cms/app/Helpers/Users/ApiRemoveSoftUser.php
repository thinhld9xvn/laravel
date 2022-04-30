<?php 
    namespace App\Helpers\Users;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\MetaStrings\b\UpdateMetaUtils;
    use App\Classes\Users\a\UserData as USER_DATA;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use Illuminate\Http\Request;
    class ApiRemoveSoftUser {
        public static function perform(Request $request, $user, $prefix = USER_DB_FIELDS::USERS_TABLE) {
            $user_guid = $user[USER_DB_FIELDS::GUID];
            $result = MetaExistsUtils::has(USER_DATA_FIELDS::USER_STATUS, $user_guid, $prefix);
            if ( $result["success"] ) :
                UpdateMetaUtils::perform($result['row'], USER_DATA::USER_TRASH, $prefix);
            endif;
        }
    }