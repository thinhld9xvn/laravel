<?php 
    namespace App\Classes\Utils;
    use App\Classes\MetaData\a\MetaDBFields;
    use App\Classes\Models\GetMetaStrTableUtils;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Models\MetaData;
    use App\Models\MetaEntityObjects;
    use Exception;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    class SchemaUtils {
        public static function checkExistsTable($table_name) {
            return Schema::hasTable($table_name);
        }
        public static function renameTable($old_name, $new_name) {
            Schema::rename($old_name, $new_name);
        }
        public static function createPostsTable($table_name = 'posts') {
            try {
                Schema::create($table_name, function (Blueprint $table) {
                    $table->id();
                    $table->integer('guid')->unique()->index();
                    $table->string('post_title', 255)->index();
                    $table->text('post_content');
                    $table->tinyText('post_excerpt');
                    $table->string('post_url', 255)->unique()->index();
                    $table->timestamp('post_date')->index();
                    $table->timestamp('post_modified_date')->index();
                    $table->integer('post_author')->index();
                    $table->string('post_status', 6);
                });
            } catch (Exception $e) {
            }
        }
        public static function createOrRenamePostsTable($table_name = 'posts', $table_new_name = '') {
            if ( empty($table_new_name) ) :
                self::createPostsTable($table_name);
                return;
            endif;
            if ( !self::checkExistsTable($table_name) ) :
                self::createPostsTable($table_name);
            else :
                if ( $table_name !== $table_new_name ) :
                    self::renameTable($table_name, $table_new_name);
                endif;
            endif;
        }
        public static function createTaxTable($table_name = 'categories', $istax = false) {
            try {
                Schema::create($table_name, function (Blueprint $table) {
                    $table->id();
                    $table->integer('guid')->unique()->index();
                    $table->string('name', 255)->index();
                    $table->text('description')->nullable();
                    $table->string('url', 255)->unique()->index();
                    $table->integer('parent')->index();
                });
                if ( $istax ) :
                    Schema::table($table_name, function(Blueprint $table) {
                        $table->string('tax_slug', 255);
                    });
                endif;
            } catch (Exception $e) {
            }
        }
        public static function createOrRenameTaxTable($table_name = 'categories', $table_new_name = '', $istax = false) {
            if ( empty($table_new_name) ) :
                self::createTaxTable($table_name, $istax);
                return;
            endif;
            if ( !self::checkExistsTable($table_name) ) :
                self::createTaxTable($table_name, $istax);
            else :
                if ( $table_name !== $table_new_name ) :
                    self::renameTable($table_name, $table_new_name);
                endif;
            endif;
        }
        public static function createMetaStringTable($table_name='metastrings') {
            try {
                Schema::create($table_name, function (Blueprint $table) {
                    $table->id();
                    $table->text('string')->nullable();
                });
            } catch (Exception $e) {
            }
        }
        public static function createOrRenameMetaStringTable($table_name = 'metastrings', $table_new_name = '') {
            if ( empty($table_new_name) ) :
                self::createMetaStringTable($table_name);
                return;
            endif;
            if ( !self::checkExistsTable($table_name) ) :
                self::createMetaStringTable($table_name);
            else :
                if ( $table_name !== $table_new_name ) :
                    self::renameTable($table_name, $table_new_name);
                endif;
            endif;
        }
        public static function dropPostTypeTables($post_type = 'post') {
            try {
                $posts_table = GetPostTypeTablePrefix::perform($post_type);
                $metastrings = GetMetaStrTableUtils::perform($post_type);
                $tax_table = GetTaxTablePrefix::perform($post_type);
                $meta_object = MetaEntityObjects::where('name', $posts_table)->get()->first();
                MetaData::where(MetaDBFields::ENTITY_OBJECT_ID, $meta_object->guid)
                        ->delete();
                Schema::drop($posts_table);
                Schema::drop($tax_table);
                Schema::drop($metastrings);   
                //
                MetaEntityObjects::where('name', $posts_table)->delete();
                MetaEntityObjects::where('name', $tax_table)->delete();
            }
            catch (Exception $e) {
            }
        }
    }