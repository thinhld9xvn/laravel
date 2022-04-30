<?php
    namespace App\Helpers\Auth;
    use Illuminate\Http\Request;
    use Symfony\Component\HttpFoundation\Response;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use App\Classes\Utils\UserMemberShip;
    class LoginHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:1',
            ]);
            if ($validator->fails())
            {
                return response(['errors'=>$validator->errors()->all()], 422);
            }
            $user = User::where('email', $request->email)->first();
            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                    $data = array_filter($user->toArray());
                    $meta = UserMemberShip::getUserMeta($user->guid);
                    $response = ['success' => true,
                                'data' => array_merge($data, $meta, ['password' => $user->password, 'token' => $token])];
                    return response($response, Response::HTTP_OK);
                } else {
                    $response = ['success' => false,
                                "errors" => "Password mismatch"];
                    return response($response, Response::HTTP_OK);
                }
            } else {
                $response = ['success' => false,
                            "message" =>'User does not exist'];
                return response($response, Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }