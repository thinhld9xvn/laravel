<?php

use App\Http\Controllers\Admin\ApTypeController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/admin', function () {
    return redirect('/admin/login');
});
Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
Route::get('/admin/login', [LoginController::class, 'index'])->name('login.index');
Route::get('/admin/ap_type', function () {
    return redirect('/admin/ap_type/postsList');
});
Route::get('/admin/ap_type/postsList', [ApTypeController::class, 'posts_list'])->name('posts_list.index');
Route::get('/admin/ap_type/newPost', [ApTypeController::class, 'new_post'])->name('new_post.index');
Route::get('/admin/ap_type/editPost', [ApTypeController::class, 'edit_post'])->name('edit_post.index');
Route::get('/admin/ap_type/categoriesList', [ApTypeController::class, 'categories_list'])->name('categories_list.index');
Route::get('/admin/ap_type/tagsList', [ApTypeController::class, 'tags_list'])->name('tags_list.index');
Route::get('/admin/configuration', function () {
    return redirect('/admin/configuration/menu');
});
Route::get('/admin/configuration/post_types', [ConfigurationController::class, 'post_types'])->name('post_types.index');
Route::get('/admin/configuration/menu', [ConfigurationController::class, 'menu'])->name('menu.index');
Route::get('/admin/users', function () {
    return redirect('/admin/users/profile');
});
Route::get('/admin/users/new_user', [UsersController::class, 'new_user'])->name('new_user.index');
Route::get('/admin/users/all_users', [UsersController::class, 'all_users'])->name('all_users.index');
Route::get('/admin/users/profile', [UsersController::class, 'profile'])->name('profile.index');
Route::get('/admin/media', [MediaController::class, 'index'])->name('media.index');