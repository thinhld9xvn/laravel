<?php
    namespace App\Http\Controllers\Auth;
    use App\Helpers\Tags\GetListsHelper;
use App\Helpers\Tags\ImportSampleHelper;
use App\Helpers\Tags\UpdateListsHelper;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    class ApiTagsController extends Controller
    {    
        public function get(Request $request) {
            return GetListsHelper::perform($request);
        }
        public function update(Request $request) {
            return UpdateListsHelper::perform($request);
        }
        public function import(Request $request) {
            return ImportSampleHelper::perform();
        }
    }