<?php
    namespace App\Http\Controllers\Auth;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Helpers\Auth\LoginHelper;
    use App\Helpers\Auth\LogoutHelper;
    use App\Helpers\Auth\RegisterHelper;
    use App\Helpers\Auth\UserHelper;
    class ApiAuthController extends Controller {
        public function register (Request $request, 
                                    $prefix = USER_DB_FIELDS::USERS_TABLE) {
            return RegisterHelper::perform($request, $prefix);
        }
        public function login (Request $request) {
            return LoginHelper::perform($request);
        }
        public function user(Request $request) {
            return UserHelper::perform($request);
        }
        public function logout (Request $request) {       
            return LogoutHelper::perform($request);   
        }
    }
