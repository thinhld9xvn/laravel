<?php 
    namespace App\Helpers\PostTypes\Api;
    use App\Classes\Options\a\OptionsData as OPTIONS_DATA;
    use App\Models\Options;
    class ApiGetPostTypesList {
        public static function perform() {
            $option = Options::where(OPTIONS_DATA::OPTION_NAME, OPTIONS_DATA::POST_TYPES_OPTION)->get()->first();
            if ( is_null($option) ) return null;
            $option = $option->toArray();
            return unserialize($option[OPTIONS_DATA::OPTION_VALUE]);
        }
    }