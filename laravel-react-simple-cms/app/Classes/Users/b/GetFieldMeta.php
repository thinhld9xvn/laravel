<?php 
    namespace App\Classes\Users\b;
    use App\Classes\MetaStrings\b\GenerateMetaKeyString;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Utils\FileUtils;
    use App\Models\MetaData;
    use Illuminate\Support\Facades\DB;
    class GetFieldMeta {
        public static function perform($meta_name, $guid, $prefix = USER_DB_FIELDS::USERS_TABLE) {
            $model = GetMetaStrTableUtils::perform($prefix);
            $metaKeyName = GenerateMetaKeyString::perform($meta_name, $guid, $prefix);
            $row = DB::table($model)->where(META_STRINGS_DB_FIELDS::STRING, $metaKeyName)->get()->first();
            if ( $row ) :
                $id = $row->id;
                $row = MetaData::where(META_DB_FIELDS::NAME_ID, $id)->get()->first();
                if ( $row ) :  
                    $row = $row->toArray();                     
                    $value_id = $row[META_DB_FIELDS::VALUE_ID];
                    $row = (array) DB::table($model)->where(META_STRINGS_DB_FIELDS::ID, $value_id)->get()->first();
                    if ( $meta_name === USER_DATA_FIELDS::USER_AVATAR ) :
                        //$data[$metaName] = asset("/storage/avatars/{$row[META_STRINGS_DB_FIELDS::STRING]}");
                        return FileUtils::getUploadAvatarUrl($row[META_STRINGS_DB_FIELDS::STRING]);
                    else :
                        return $row[META_STRINGS_DB_FIELDS::STRING];
                    endif;
                endif;
            endif;     
            return false;
        }
    }