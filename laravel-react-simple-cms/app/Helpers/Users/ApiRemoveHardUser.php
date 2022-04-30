<?php 
    namespace App\Helpers\Users;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Classes\Utils\ClassUtils;
    use Illuminate\Http\Request;
    use App\Helpers\Profile\ApiRemoveMeta;
    use App\Models\User;
    class ApiRemoveHardUser {
        public static function perform(Request $request, $user) {
            $username = $user[USER_DB_FIELDS::USERNAME];
            $params = ClassUtils::getConstants(new USER_DATA_FIELDS);
            foreach ($params as $key => $value) :
                ApiRemoveMeta::perform($request,
                                        $value,
                                        USER_DB_FIELDS::USERS_TABLE,
                                        $user);
            endforeach;
            User::where('username', $username)->delete();
        }
    }