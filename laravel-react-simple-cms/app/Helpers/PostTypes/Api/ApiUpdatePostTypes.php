<?php 
    namespace App\Helpers\PostTypes\Api;
    use App\Classes\Options\a\OptionsData as OPTIONS_DATA;
    use App\Classes\MetaEntityObjects\b\CreateOrUpdateMetaObject;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Utils\SchemaUtils;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Models\Options;
    class ApiUpdatePostTypes {
        public static function perform($value, $option, $old_slug = '') {
            Options::where(OPTIONS_DATA::OPTION_NAME, OPTIONS_DATA::POST_TYPES_OPTION)
                    ->update([OPTIONS_DATA::OPTION_VALUE => serialize($value)]);
            //
            $slug = $option[POST_DATA::PT_OPTION_SLUG];
            $old_post_table = GetPostTypeTablePrefix::perform($old_slug);
            $post_table = GetPostTypeTablePrefix::perform($slug);
            //
            $old_tax_table = GetTaxTablePrefix::perform($old_slug);
            $tax_table = GetTaxTablePrefix::perform($slug);
            //
            $old_metastring_table = GetMetaStrTableUtils::perform($old_slug);
            $metastring_table = GetMetaStrTableUtils::perform($slug);
            //
            CreateOrUpdateMetaObject::perform($old_post_table, $post_table);
            CreateOrUpdateMetaObject::perform($old_tax_table, $tax_table);
            //
            SchemaUtils::createOrRenamePostsTable(!empty($old_slug) ? $old_post_table : $post_table, 
                                                    !empty($old_slug) ? $post_table : '');
            SchemaUtils::createOrRenameTaxTable(!empty($old_slug) ? $old_tax_table : $tax_table, 
                                                !empty($old_slug) ? $tax_table : '', true);
            SchemaUtils::createOrRenameMetaStringTable(!empty($old_slug) ? $old_metastring_table : $metastring_table, 
                                                        !empty($old_slug) ? $metastring_table : '');
            //
            return true;
        }
    }