<?php  
    namespace App\Classes\MetaStrings\b;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Models\MetaData;
    use Illuminate\Support\Facades\DB;
    class MetaRemoveUtils {
        public static function perform($row, $post_type, $istax = false) {
            $model = GetMetaStrTableUtils::perform($post_type, $istax);
            $value_id = $row[META_DB_FIELDS::VALUE_ID];
            $name_id = $row[META_DB_FIELDS::NAME_ID];
            DB::table($model)->where(META_STRINGS_DB_FIELDS::ID, $value_id)->delete();
            DB::table($model)->where(META_STRINGS_DB_FIELDS::ID, $name_id)->delete();
            MetaData::where(META_DB_FIELDS::VALUE_ID, $value_id)->delete();
        }
    }