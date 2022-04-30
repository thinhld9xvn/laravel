<?php  
    namespace App\Classes\MetaStrings\b;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use Illuminate\Support\Facades\DB;
    class UpdateMetaUtils {
        public static function perform($row, $meta_value, $post_type = 'post', $istax = false) {            
            $model = GetMetaStrTableUtils::perform($post_type, $istax);
            $value_id = $row[META_DB_FIELDS::VALUE_ID];
            $row = DB::table($model)->where(META_STRINGS_DB_FIELDS::ID, $value_id);
            $row->update([META_STRINGS_DB_FIELDS::STRING => $meta_value]);
        }
    }