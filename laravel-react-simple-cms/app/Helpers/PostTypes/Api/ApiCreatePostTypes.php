<?php 
    namespace App\Helpers\PostTypes\Api;
    use App\Classes\Options\a\OptionsData as OPTIONS_DATA;
    use App\Classes\MetaEntityObjects\b\CreateOrUpdateMetaObject;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\SchemaUtils;
    use App\Models\Options;
    class ApiCreatePostTypes {
        public static function perform($value, $option) {
            $o = new Options;
            $o->option_name = OPTIONS_DATA::POST_TYPES_OPTION;
            $o->option_value = serialize($value);
            $o->save();
            //
            $name = $option[POST_DATA::PT_OPTION_SLUG];
            $post_table = GetPostTypeTablePrefix::perform($name);
            $tax_table = GetTaxTablePrefix::perform($name);
            //
            CreateOrUpdateMetaObject::perform($post_table);
            CreateOrUpdateMetaObject::perform($tax_table);
            //
            SchemaUtils::createPostsTable($post_table);
            SchemaUtils::createTaxTable($tax_table, true);
            SchemaUtils::createMetaStringTable(GetMetaStrTableUtils::perform($name));
            return true;
        }
    }