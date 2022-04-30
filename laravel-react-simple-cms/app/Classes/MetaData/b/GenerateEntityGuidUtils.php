<?php 
    namespace App\Classes\MetaData\b;
    use App\Models\MetaData;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    class GenerateEntityGuidUtils {
        public static function perform() {
            $id = 1;
            $row = MetaData::orderBy(META_DB_FIELDS::ENTITY_GUID, 'desc')->first();
            if ( $row ) {   
                $row = $row->toArray();
                return floatval($row[META_DB_FIELDS::ENTITY_GUID]) + 1;
            }
            return $id;
        }
    }