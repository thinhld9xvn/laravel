<?php
    namespace App\Http\Controllers\Auth;
    use App\Classes\Utils\DateTimeUtils;
    use App\Classes\Utils\ResponseUtils;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    class ApiDateTimeController extends Controller
    {    
        public function get_now(Request $request) {
            return ResponseUtils::success(DateTimeUtils::get_format(time()));
        }
    }
