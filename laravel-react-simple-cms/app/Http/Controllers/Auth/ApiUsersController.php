<?php
namespace App\Http\Controllers\Auth;
use App\Classes\Uploads\b\GetAvatarsListUtils;
use App\Http\Controllers\Controller;
use App\Classes\Utils\ResponseUtils;
use App\Helpers\Users\ApiGetUsersList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Classes\Users\a\UserData as USER_DATA;
use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
use App\Helpers\Profile\Api\ApiUpdateMeta;
use App\Helpers\Users\ApiRemoveHardUser;
use App\Helpers\Users\ApiRemoveSoftUser;
use App\Models\User;
class ApiUsersController extends Controller
{
    public function get_active_users_list(Request $request) {
        $data = ApiGetUsersList::get('public');
        return ResponseUtils::success($data);
    }
    public function get_deactive_users_list(Request $request) {
        $data = ApiGetUsersList::get('trash');
        return ResponseUtils::success($data);
    }
    public function get_users_list(Request $request) {
        $data = ApiGetUsersList::get('all');
        return ResponseUtils::success($data);
    }
    public function get_avatars_list(Request $request) {
        $data = GetAvatarsListUtils::perform();
        return ResponseUtils::success($data);
    }
    public function remove_user(Request $request) {
        $validator = Validator::make($request->all(), [
            USER_DB_FIELDS::GUID => 'required'
        ]);
        if ( $validator->fails() ) :
            return [
                'status' => !$validator->fails(),
                'error' => $validator->errors()->all()
            ];
        endif;        
        $guid = $request->input(USER_DB_FIELDS::GUID);
        $method = !empty($request->input('method')) ? intval($request->input('method')) : 
                                                        USER_DATA::SOFT;
        $user = User::find($guid);
        if ( !empty($user) ) :
            $user = $user->toArray();
            if ( $method === USER_DATA::HARD ) :
                ApiRemoveHardUser::perform($request, $user);
            else :
                ApiRemoveSoftUser::perform($request, $user);
            endif;
        endif;
        return ResponseUtils::success(true);
    }
    public function restore_user(Request $request) {
        $validator = Validator::make($request->all(), [
            USER_DB_FIELDS::GUID => 'required'
        ]);
        if ( $validator->fails() ) :
            return [
                'status' => !$validator->fails(),
                'error' => $validator->errors()->all()
            ];
        endif;        
        $guid = $request->input(USER_DB_FIELDS::GUID);
        $user = User::find($guid);
        if ( !empty($user) ) :
            ApiUpdateMeta::perform($request, 
                                    USER_DATA_FIELDS::USER_STATUS,
                                    USER_DATA::USER_PUBLIC,
                                    USER_DB_FIELDS::USERS_TABLE,
                                    $user);
        endif;
        return ResponseUtils::success(true);
    }
}
