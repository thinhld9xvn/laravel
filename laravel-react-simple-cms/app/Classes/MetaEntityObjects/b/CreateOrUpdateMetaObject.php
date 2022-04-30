<?php  
    namespace App\Classes\MetaEntityObjects\b;
    use App\Models\MetaEntityObjects;
    class CreateOrUpdateMetaObject {
        public static function perform($value, $new_value = '') {
            $hasExists = !empty(MetaEntityObjects::where('name', $value)->first());
            if ( !$hasExists ) :
                $obj = new MetaEntityObjects();
                $obj->guid = intval(MetaEntityObjects::orderBy('id', 'desc')->first()->guid) + 1;
                $obj->name = $value;
                $obj->save();
            else :
                if ( $value !== $new_value ) :
                    MetaEntityObjects::where('name', $value)
                                    ->update(['name' => $new_value]);
                endif;
            endif;
        }
    }