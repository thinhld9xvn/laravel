<?php  
    namespace App\Classes\MetaStrings\b;
    use App\Classes\MetaData\a\MetaData as META_DATA;
    use App\Classes\MetaData\a\MetaDBFields as META_DB_FIELDS;
    use App\Models\MetaData;
    use App\Classes\MetaData\b\GenerateEntityGuidUtils;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Models\MetaEntityObjects;

    class InsertMetaUtils {
        public static function perform($meta_name, $meta_value, $meta_type, $guid, $post_type = 'post', $istax = false) {
            $prefix = $istax ? GetTaxTablePrefix::perform($post_type) : $post_type;
            $metaKeyName = GenerateMetaKeyString::perform($meta_name, $guid, $prefix);
            $name_id = GenerateMetaStrings::perform($metaKeyName, $post_type, $istax);
            $value_id = GenerateMetaStrings::perform($meta_value, $post_type, $istax);
            $metaObj = MetaEntityObjects::where('name', $prefix)->get()->first();
            /* */
            $metadata = new MetaData();
            $entity_guid = GenerateEntityGuidUtils::perform();            
            $metadata[META_DB_FIELDS::ENTITY_GUID] = $entity_guid;
            $metadata[META_DB_FIELDS::ENTITY_OBJECT_ID] = $metaObj->guid;
            $metadata[META_DB_FIELDS::NAME_ID] = $name_id;
            $metadata[META_DB_FIELDS::VALUE_ID] = $value_id;
            $metadata[META_DB_FIELDS::VALUE_TYPE] = $meta_type;
            $metadata[META_DB_FIELDS::OWNER_GUID] = $guid;
            $metadata[META_DB_FIELDS::ACCESS_ID] = META_DATA::ACCESS_ID_DEFAULT;            
            $metadata[META_DB_FIELDS::TIME_CREATED] = time();
            $metadata[META_DB_FIELDS::ENABLED] = META_DATA::ENABLED;
            $metadata->save();
        }
    }