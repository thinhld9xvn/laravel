<?php  
    namespace App\Classes\Posts\b\metadata;
    use App\Classes\MetaStrings\b\MetaExistsUtils;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\MetaStrings\a\MetaStringsDBFields as META_STRINGS_DB_FIELDS;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use Illuminate\Support\Facades\DB;
    class GetPostFieldMeta {
        public static function perform($guid, $meta_name, $post_type = 'post') {
            $model = GetMetaStrTableUtils::perform($post_type);
            $results = MetaExistsUtils::has($meta_name, $guid, $post_type);
            if ( $results['success'] ) :
                $row = $results['row'];
                $metaRow = DB::table($model)->where(META_STRINGS_DB_FIELDS::ID,
                                                        $row[META_DB_FIELDS::VALUE_ID])->get()->first();
                return $metaRow->string;
            endif;
            return false;
        }
    }