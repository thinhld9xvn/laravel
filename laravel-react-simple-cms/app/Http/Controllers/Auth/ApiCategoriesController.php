<?php
    namespace App\Http\Controllers\Auth;
    use App\Helpers\Categories\GetListsHelper;
    use App\Helpers\Categories\ImportSampleHelper;
    use App\Helpers\Categories\UpdateListsHelper;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    class ApiCategoriesController extends Controller
    {    
        public function get(Request $request) {
            return GetListsHelper::perform($request);
        }
        public function update(Request $request) {
            return UpdateListsHelper::perform($request);
        }
        public function import(Request $request) {
            return ImportSampleHelper::perform($request);
        }
    }