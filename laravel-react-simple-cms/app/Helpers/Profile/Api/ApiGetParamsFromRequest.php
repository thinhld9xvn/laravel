<?php 
    namespace App\Helpers\Profile\Api;
    use App\Classes\Utils\ClassUtils;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    class ApiGetParamsFromRequest {
        public static function perform($request) {
            $inputs = $request->all();
            $data = [];
            $constants = ClassUtils::getConstants(new USER_DATA_FIELDS);
            foreach ( $inputs as $key => $value ) :
                if ( in_array($key, $constants) && 
                        !empty($value) ) :
                    $data[$key] = $value;
                endif;
            endforeach;
            return $data;
        }
    }