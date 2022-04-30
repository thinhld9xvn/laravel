<?php 
    namespace App\Helpers\Profile\Api\Validation;
    use Illuminate\Support\Facades\Validator;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    class ApiValidationInput {
        public static function perform($request) {
            $validator = Validator::make($request->all(), [
                USER_DATA_FIELDS::USER_FIRST_NAME => 'required',
                USER_DATA_FIELDS::USER_LAST_NAME => 'required',
                USER_DATA_FIELDS::USER_DISPLAY_NAME => 'required',
                USER_DATA_FIELDS::USER_AVATAR =>'required',
                USER_DATA_FIELDS::USER_ROLE_ID =>'required'
            ]);
            return [
                'status' => !$validator->fails(),
                'error' => $validator->fails() ? $validator->errors()->all() : null
            ];
        }
    }