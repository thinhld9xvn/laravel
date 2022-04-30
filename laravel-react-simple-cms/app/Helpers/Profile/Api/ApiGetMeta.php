<?php 
    namespace App\Helpers\Profile\Api;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Classes\Users\b\GetFieldMeta;
    use App\Classes\Utils\ClassUtils;
    class ApiGetMeta {
        public static function perform($guid) {
            $data = [];
            $fields = ClassUtils::getConstants(new USER_DATA_FIELDS);
            foreach ( $fields as $key => $meta_name ) :
                if ( $meta_name === USER_DATA_FIELDS::USER_GUID || 
                        $meta_name === USER_DATA_FIELDS::USER_EMAIL ) continue;
                $value = GetFieldMeta::perform($meta_name, $guid);
                $data[$meta_name] = $value ? $value : '';
            endforeach;
            return $data;
        }
    }