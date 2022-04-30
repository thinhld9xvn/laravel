<?php 
    namespace App\Helpers\Profile\Api\Validation;
    use Illuminate\Support\Facades\Validator;
    use App\Classes\Users\a\UserDataPassFields as USER_DATA_PASS_FIELDS;
    class ApiPassValidationInput {
        public static function perform($request) {
            $validator = Validator::make($request->all(), [
                USER_DATA_PASS_FIELDS::USER_NAME => 'required',
                USER_DATA_PASS_FIELDS::USER_OLD_PASS => 'required',
                USER_DATA_PASS_FIELDS::USER_NEW_PASS => 'required'               
            ]);
            return [
                'status' => !$validator->fails(),
                'error' => $validator->fails() ? $validator->errors()->all() : null
            ];
        }
    }