<?php
    namespace App\Helpers\Auth;
    use App\Classes\Users\a\UserData as USER_DATA;
    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Str;
    use App\Classes\Users\a\UserNewDataFields as USER_NEW_DATA_FIELDS;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Helpers\Profile\Api\ApiGetParamsFromRequest;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Helpers\Profile\Api\ApiUpdateMeta;
    use App\Helpers\Users\ApiUploadAvatar;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use App\Classes\Utils\ResponseUtils;
    class RegisterHelper {
        public static function perform(Request $request, 
                                            $prefix = USER_DB_FIELDS::USERS_TABLE) {
            $validator = Validator::make($request->all(), [
                USER_NEW_DATA_FIELDS::USER_NAME => 'required',
                USER_NEW_DATA_FIELDS::USER_PASSWORD => 'required',
                USER_NEW_DATA_FIELDS::USER_EMAIL => 'required',
                USER_NEW_DATA_FIELDS::USER_FIRST_NAME => 'required',
                USER_NEW_DATA_FIELDS::USER_LAST_NAME => 'required',
                USER_NEW_DATA_FIELDS::USER_LOCATION => 'required',
                USER_NEW_DATA_FIELDS::USER_AGE => 'required',
                USER_NEW_DATA_FIELDS::USER_WEBSITE => 'required',
                USER_NEW_DATA_FIELDS::USER_ROLE_ID => 'required',
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $avatar_uploaded = $request->file(USER_NEW_DATA_FIELDS::USER_AVATAR);
            $request['password'] = Hash::make($request['password']);
            $request['remember_token'] = Str::random(10);        
            $user = User::create($request->toArray());
            $params = ApiGetParamsFromRequest::perform($request);            
            if ( !isset($params[USER_DATA_FIELDS::USER_DISPLAY_NAME] ) ) :
                $params[USER_DATA_FIELDS::USER_DISPLAY_NAME] = $params[USER_DATA_FIELDS::USER_LAST_NAME] . ' ' . $params[USER_DATA_FIELDS::USER_FIRST_NAME];
            endif;
            if ( !isset($params[USER_DATA_FIELDS::USER_AVATAR]) ) :
                $params[USER_DATA_FIELDS::USER_AVATAR] = USER_DATA::USER_DEFAULT_AVATAR;
            else :
                if ( !empty( $avatar_uploaded) ) :
                    ApiUploadAvatar::perform($request);
                endif;
            endif;            
            if ( !isset($params[USER_DATA_FIELDS::USER_ABOUT_ME]) ) :
                $params[USER_DATA_FIELDS::USER_ABOUT_ME] = null;
            endif;
            $params[USER_DATA_FIELDS::USER_JOIN_DATE] = date('Y-m-d H:m:i', time());
            $params[USER_DATA_FIELDS::USER_STATUS] = USER_DATA::USER_PUBLIC;
            $params[USER_DATA_FIELDS::USER_IS_ONLINE] = USER_DATA::USER_OFFLINE;
            foreach ($params as $key => $value) :
                if ( in_array($key, [USER_DATA_FIELDS::USER_GUID, 
                                        USER_DATA_FIELDS::USER_EMAIL]) ) continue; // ignore
                ApiUpdateMeta::perform($request, 
                                        $key,
                                        $value,
                                        $prefix,
                                        $user);
            endforeach;
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            return ResponseUtils::success($token);
        }
    }