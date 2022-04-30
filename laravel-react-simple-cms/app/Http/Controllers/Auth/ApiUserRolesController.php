<?php
namespace App\Http\Controllers\Auth;
use App\Classes\Utils\ResponseUtils;
use App\Http\Controllers\Controller;
use App\Models\UserRoles;
use Illuminate\Http\Request;
class ApiUserRolesController extends Controller
{
    public function get(Request $request) {
        $rolesList = UserRoles::all()->toArray();
        return ResponseUtils::success($rolesList);
    }
}
