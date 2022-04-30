<?php
    namespace App\Http\Controllers\Auth;
    use App\Helpers\Posts\GetPostHelper;
    use App\Helpers\Posts\GetPostsListHelper;
    use App\Helpers\Posts\PublishPostHelper;
    use App\Helpers\Posts\RemovePostHelper;
    use App\Helpers\Posts\RestorePostHelper;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    class ApiApTypeController extends Controller { 
        public function get_posts_list(Request $request){
            return GetPostsListHelper::perform($request);
        }
        public function publish_post(Request $request) {
            return PublishPostHelper::perform($request);
        }
        public function get_post(Request $request) {
            return GetPostHelper::perform($request);
        }
        public function remove_post(Request $request) {
            return RemovePostHelper::perform($request);
        }
        public function restore_post(Request $request) {
            return RestorePostHelper::perform($request);
        }
    }
