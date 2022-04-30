<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FileManagerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Hash;
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
/* Route for user */
Route::get('', [PagesController::class, 'getindex']);
/* Display front */
Route::get('category/{slug}', [PagesController::class, 'getCategory']);
Route::get('post/{slug}.html', [PagesController::class, 'getPost']);
Route::get('tag/{tag}', [PagesController::class, 'getTag']);
Route::get('author/{name}', [PagesController::class, 'getAuthor']);
Route::get('search', [PagesController::class, 'getSearch'])->name('search');
Route::get('contact.html', [PagesController::class, 'getContact']);

Route::get('login', [LoginController::class, 'getLogin']);
Route::post('login', [LoginController::class, 'postLogin'])->name('login');
Route::get('logout', [LoginController::class, 'getLogout']);
Route::get('changepassword', function() {
    
    echo Hash::make('12345678');
});

Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});

/*Group router for author and admin */
Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function(){

	Route::get('dashbroad', [HomeController::class, 'getdashbroad'])->name('dashbroad');

	/* Group for profile */
    Route::get('profile', [ProfileController::class, 'getProfile']);
    Route::post('profile/update', [ProfileController::class, 'profileUpdate']);

    Route::get('file-manager', [FileManagerController::class, 'getFileManager']);

    /* Group post*/
    Route::prefix('post')->group(function () {
        Route::get('/', [PostController::class, 'getList'])->name('list-post');
        Route::get('add', [PostController::class, 'getAdd']);
        Route::put('updateStatus', [PostController::class, 'updateStatus']);
        Route::put('updateHot', [PostController::class, 'updateHot']);
        Route::post('add', [PostController::class, 'postAdd']);
        Route::get('update/{id}', [PostController::class, 'getUpdate']);
        Route::post('update/{id}', [PostController::class, 'postUpdate']);
        Route::get('delete/{id}', [PostController::class, 'getDelete']);
    });
    
    /* Group for admin */
    Route::middleware(['role'])->group(function () {
        /* Group category */
        Route::prefix('category')->group(function () {
            Route::get('/', [CategoryController::class, 'getList']);
            Route::get('add', [CategoryController::class, 'getAdd']);
            Route::post('add', [CategoryController::class, 'postAdd']);
            Route::get('data', [CategoryController::class, 'dataTable'])->name('data');
            Route::post('update', [CategoryController::class, 'postUpdate']);
            Route::delete('delete', [CategoryController::class, 'delete']);
        });
        /* Group file */
        Route::prefix('tag')->group(function () {
            Route::get('/', [TagController::class, 'getList'])->name('list-tag');
            Route::get('data', [TagController::class, 'dataTable'])->name('data-tag');
            Route::post('add', [TagController::class, 'postAdd']);
            Route::put('update', [TagController::class, 'putUpdate']);
            Route::delete('delete', [TagController::class, 'delete']);
        });
        /* Group author */
        Route::prefix('author')->group(function () {
            Route::get('/', [AdminController::class, 'getList'])->name('list-author');
            Route::get('data', [AdminController::class, 'dataTable'])->name('data-author');
            Route::post('add', [AdminController::class, 'postAdd']);
            Route::delete('delete', [AdminController::class, 'delete']);
        });
    });
});
