<?php 
    namespace App\Classes\Posts\b;
    use App\Classes\Models\GetPostTypeTablePrefix;
    use Illuminate\Support\Facades\DB;
    class GetRelatedSlugs {
        public static function perform($slug, $excludes = [], $post_type = 'post') {
            $model = GetPostTypeTablePrefix::perform($post_type);
            return DB::table($model)->select('post_url')->whereNotIn('post_url', $excludes)
                                            ->where('post_url', 'like', $slug.'%')
                                            ->get();
        }
    }