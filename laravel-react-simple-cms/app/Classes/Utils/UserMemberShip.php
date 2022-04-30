<?php 
    namespace App\Classes\Utils;
    use App\Helpers\Profile\Api\ApiGetMeta;
    class UserMemberShip {
        public static function getUserMeta($guid) {
            return ApiGetMeta::perform($guid);
        }
    }