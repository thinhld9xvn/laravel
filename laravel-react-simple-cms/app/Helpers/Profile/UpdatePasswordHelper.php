<?php 
    namespace App\Helpers\Profile;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Http\Request;
    use App\Helpers\Profile\Api\Validation\ApiPassValidationInput;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    class UpdatePasswordHelper {
        public static function perform(Request $request) {
            $results = ApiPassValidationInput::perform($request);
            if ( !$results['status'] ) {
                return ResponseUtils::error($results['error']);
            }
            $username = $request->input('username');
            $oldpass = $request->input('old_password');
            $newpass = $request->input('new_password');
            $user = User::where('username', $username)->first();
            if ( $user ) {
                if (Hash::check($oldpass, $user->password)) {
                    $user->password = Hash::make($newpass);
                    $user->save();
                    return ResponseUtils::success($user->password);
                }
                return ResponseUtils::info('Mật khẩu cũ không chính xác.');
            }
            return ResponseUtils::info('Người dùng không tồn tại.');
        }
    }