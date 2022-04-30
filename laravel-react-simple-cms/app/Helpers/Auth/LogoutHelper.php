<?php
    namespace App\Helpers\Auth;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    class LogoutHelper {
        public static function perform(Request $request) {
            $token = $request->user()->token();
            $token->revoke();
            return ResponseUtils::success('You have been successfully logged out!');
        }
    }