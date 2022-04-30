<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
class ApTypeController extends Controller
{
    //
    public function posts_list(Request $request) {
        if ( empty($request->input('id')) || 
                empty($request->input('slug')) ) :
            return redirect()->route('posts_list.index', ['id' => 'post', 'slug' => 'post']);
        endif;
        return view('index');
    }
    public function new_post(Request $request) {
        if ( empty($request->input('id')) || 
                empty($request->input('slug')) ) :
            return redirect()->route('new_post.index', ['id' => 'post', 'slug' => 'post']);
        endif;
        return view('index');
    }
    public function edit_post(Request $request) {
        if ( empty($request->input('id')) || 
                empty($request->input('slug')) ) :
            return redirect()->route('edit_post.index', ['id' => 'post', 'slug' => 'post']);
        endif;
        return view('index');
    }
    public function categories_list(Request $request) {
        if ( empty($request->input('id')) || 
                empty($request->input('slug')) ) :
            return redirect()->route('categories_list.index', ['id' => 'post', 'slug' => 'post']);
        endif;
        return view('index');
    }
    public function tags_list(Request $request) {
        if ( empty($request->input('id')) ||
                empty($request->input('slug')) ) :
            return redirect()->route('tags_list.index', ['id' => 'post', 'slug' => 'post']);
        endif;
        return view('index');
    }
}