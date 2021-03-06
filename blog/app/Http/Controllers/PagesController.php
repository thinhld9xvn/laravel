<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Admin;

class PagesController extends Controller
{
    public function getindex()
    {
        $cates = Category::where('name','!=','video')->get();
        $videos = Post::where('post_type','=','video')->take(5)->orderBy('created_at','desc')->get();
        return view('news.pages.home',['cates'=>$cates,'videos'=>$videos]);
    }
    public function getCategory($slug)
    {
        $cate = Category::where('slug', $slug)->first();
        if(empty($cate) || empty($cate->posts)){
            return view('news.pages.category',['key'=>$slug]);
        } else {
            $list = Post::where('category_id',$cate->id)->where('status',1)->orderBy('created_at','des')->paginate(2);
            return view('news.pages.category',['posts'=>$list,'cate'=>$cate->name]);
        }
    	
    }
    public function getPost($slug)
    {
    	$post = Post::where('status',1)->where('slug', $slug)->first();
        if(empty($post)){
            return view('news.pages.singlepost',['key'=>$slug]);
        } else
        {
            $post->view = $post->view + 1;
            $post_lq = Post::where('status',1)->where('slug','!=', $slug)->where('category_id','=',$post->category_id)->take(5)->get();
            $post->save();
            return view('news.pages.singlepost',['post'=>$post,'lq'=>$post_lq]);
        }
    }
    public function getTag($key)
    {
    	$tag = Tag::where('name', $key)->first();
        if(empty($tag) || empty($tag->posts)){
            return view('news.pages.tag',['key'=>$key]);
        } else 
        return view('news.pages.tag',['tag'=>$tag]);
    }
    public function getSearch(Request $request)
    {
        $key= $request->input('key');
    	$posts = Post::where('status',1)->where('title', 'like', '%'.$key.'%')->get();
        return view('news.pages.search',['posts'=>$posts,'key'=>$key]);
    }
    public function getAuthor($user)
    {
        $author = Admin::where('name',$user )->first();
        if(empty($author) || empty($author->posts)){
            return view('news.pages.author',['key'=>$user]);
        } else 
        return view('news.pages.author',['author'=>$author]);
    }
    public function getContact()
    {
    	return view('news.pages.contact');
    }
}
