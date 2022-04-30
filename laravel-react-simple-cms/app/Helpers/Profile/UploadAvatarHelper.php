<?php 
    namespace App\Helpers\Profile;
    use Illuminate\Http\Request;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\Users\ApiUploadAvatar;
    use Illuminate\Support\Facades\Validator;
    class UploadAvatarHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                USER_DB_FIELDS::USERNAME => 'required',
                USER_DATA_FIELDS::USER_AVATAR => 'required'
            ]);
            if ( $validator->fails() ) :
                return [
                    'status' => !$validator->fails(),
                    'error' => $validator->errors()->all()
                ];
            endif;
            $results = ApiUploadAvatar::perform($request);
            return ResponseUtils::success($results);
        }
    }