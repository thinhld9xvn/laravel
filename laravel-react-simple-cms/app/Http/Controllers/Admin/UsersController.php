<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
class UsersController extends Controller
{
    //
    public function all_users() {
        return view('index');        
    }
    public function new_user() {
        return view('index');        
    }
    public function profile() {
        return view('index');        
    }
}
