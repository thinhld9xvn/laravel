<?php 
    namespace App\Helpers\Profile;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use App\Helpers\Profile\Api\ApiGetParamsFromRequest;
    use App\Helpers\Profile\Api\Validation\ApiValidationInput;
    use App\Helpers\Profile\Api\ApiUpdateMeta;
    use App\Models\User;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    class UpdateHelper {
        public static function perform(Request $request) {
            $results = ApiValidationInput::perform($request);
            if ( !$results['status'] ) {
                return ResponseUtils::info($results['error']);
            }
            $params = ApiGetParamsFromRequest::perform($request);
            $user = !empty($params[USER_DATA_FIELDS::USER_GUID]) ? User::find($params[USER_DATA_FIELDS::USER_GUID]) : null;
            foreach ($params as $key => $value) :
                if ( in_array($key, [USER_DATA_FIELDS::USER_GUID, 
                                        USER_DATA_FIELDS::USER_EMAIL]) ) continue; // ignore
                ApiUpdateMeta::perform($request, 
                                        $key,
                                        $value,
                                        USER_DB_FIELDS::USERS_TABLE,
                                        $user);
            endforeach;
            return ResponseUtils::success(true);
        }
    }