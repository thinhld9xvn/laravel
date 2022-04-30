<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
class ConfigurationController extends Controller
{
    //
    public function post_types() {
        return view('index');
    }
    public function menu() {
        return view('index');
    }
}