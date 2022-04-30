<?php 
    namespace App\Helpers\Uploads;
    use Illuminate\Support\Facades\Validator;   
    class ApiValidationInput {
        public static function perform($request, $required) {
            $validator = Validator::make($request->all(), $required);
            return [
                'status' => !$validator->fails(),
                'error' => $validator->fails() ? $validator->errors()->all() : null
            ];
        }
    }