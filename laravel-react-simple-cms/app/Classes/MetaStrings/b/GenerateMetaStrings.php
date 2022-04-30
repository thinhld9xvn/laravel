<?php  
    namespace App\Classes\MetaStrings\b;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
use App\Classes\Models\GetMetaStrTableUtils;
use Illuminate\Support\Facades\DB;
    class GenerateMetaStrings {
        public static function perform($v, $post_type = 'post', $istax = false) {
            $model = GetMetaStrTableUtils::perform($post_type, $istax);
            return DB::table($model)->insertGetId([META_STRINGS_DB_FIELDS::STRING => $v]);
        }
    }