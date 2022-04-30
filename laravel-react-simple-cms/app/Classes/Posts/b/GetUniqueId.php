<?php 
    namespace App\Classes\Posts\b;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use Illuminate\Support\Facades\DB;
    class GetUniqueId {
        public static function perform($post_type = 'post') {
            $model = GetPostTypeTablePrefix::perform($post_type);
            $row = DB::table($model)->orderBy('id', 'desc')->first();
            return !empty($row) ? intval($row->guid) + 1 : 1;
        }
    }