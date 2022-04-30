<?php
    namespace App\Helpers\Auth;
    use App\Classes\Utils\ResponseUtils;
    use App\Classes\Utils\UserMemberShip;
    use Illuminate\Http\Request;
    class UserHelper {
        public static function perform(Request $request) {
            $data = array_filter($request->user()->toArray());
            $meta = UserMemberShip::getUserMeta($data['guid']);
            return ResponseUtils::success(array_merge($data, $meta));
        }
    }