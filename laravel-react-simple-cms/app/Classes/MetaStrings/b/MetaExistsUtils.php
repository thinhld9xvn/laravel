<?php  
    namespace App\Classes\MetaStrings\b;
    use App\Models\MetaData;
    use App\Classes\MetaStrings\b\GenerateMetaKeyString;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Models\GetTaxTablePrefix;
    use Illuminate\Support\Facades\DB;
    class MetaExistsUtils {
        public static function has($meta_name, $guid, $post_type = 'post', $istax=false) {           
            $prefix = $istax ? GetTaxTablePrefix::perform($post_type) : $post_type;
            $model = GetMetaStrTableUtils::perform($post_type, $istax);
            $metaKeyName = GenerateMetaKeyString::perform($meta_name, $guid, $prefix);
            $rows = DB::table($model)->where(META_STRINGS_DB_FIELDS::STRING, $metaKeyName)->get()->all();
            if ( $rows ) :
                foreach ( $rows as $key => $row ) :
                    $row = (array) $row;
                    $id_value = $row[META_STRINGS_DB_FIELDS::ID]; 
                    $result = MetaData::where([
                                                [ META_DB_FIELDS::NAME_ID, '=', $id_value ], 
                                                [ META_DB_FIELDS::OWNER_GUID, '=', $guid ]
                                            ])->first();
                    if ( $result ) :
                        return [
                            "success" => true,
                            "row" => $result->toArray()
                        ];
                    endif;
                endforeach;
            endif;
            return [
                "success" => false
            ];
        }
    }