<?php 
    namespace App\Helpers\Profile\Api;
    use App\Classes\Utils\ClassUtils;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    class ApiGetParamsFromUser {
        public static function perform($user) {
            $data = [];
            $constants = ClassUtils::getConstants(new USER_DATA_FIELDS);
            foreach ( $constants as $key => $value ) :
                if ( !empty($user[$value] ) ) :
                    $data[$value] = $user[$value];
                endif;
            endforeach;
            return $data;
        }
    }