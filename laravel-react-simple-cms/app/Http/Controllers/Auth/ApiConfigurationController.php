<?php
    namespace App\Http\Controllers\Auth;
    use App\Helpers\PostTypes\CreatePostTypeHelper;
    use App\Helpers\PostTypes\GetPostTypesListHelper;
    use App\Helpers\PostTypes\RemovePostTypeHelper;
    use App\Helpers\PostTypes\RestorePostTypeHelper;
    use App\Helpers\PostTypes\UpdatePostTypeHelper;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    class ApiConfigurationController extends Controller { 
        public function get_post_types_list(Request $request){
            return GetPostTypesListHelper::perform($request);
        }
        public function create_new_post_type(Request $request) {
            return CreatePostTypeHelper::perform($request);
        }
        public function update_post_type(Request $request) {
            return UpdatePostTypeHelper::perform($request);
        }
        public function remove_post_type(Request $request) {
            return RemovePostTypeHelper::perform($request);
        }
        public function restore_post_type(Request $request) {
            return RestorePostTypeHelper::perform($request);
        }
    }
