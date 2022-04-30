<?php

use App\Http\Controllers\Auth\ApiApTypeController;
use App\Http\Controllers\Auth\ApiUsersController;
use App\Http\Controllers\Auth\ApiUserRolesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\Auth\ApiCategoriesController;
use App\Http\Controllers\Auth\ApiConfigurationController;
use App\Http\Controllers\Auth\ApiDateTimeController;
use App\Http\Controllers\Auth\ApiProfileController;
use App\Http\Controllers\Auth\ApiTagsController;
use App\Http\Controllers\Auth\ApiUploadsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [ApiAuthController::class, 'login'])->name('login.api');
Route::post('/register',[ApiAuthController::class, 'register'])->name('register.api');  
Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::get('/getNow', [ApiDateTimeController::class, 'get_now'])->name('getNow.api');
    Route::get('/user', [ApiAuthController::class, 'user'])->name('user.api');
    Route::get('/getFileLists', [ApiUploadsController::class, 'get_file_lists'])->name('getFileLists.api');
    Route::get('/getFolderLists', [ApiUploadsController::class, 'get_folder_lists'])->name('getFolderLists.api');
    Route::get('/getRolesList', [ApiUserRolesController::class, 'get'])->name('getRolesList.api');    
    Route::get('/getActiveUsers', [ApiUsersController::class, 'get_active_users_list'])->name('getActiveUsers.api');
    Route::get('/getDeactiveUsers', [ApiUsersController::class, 'get_deactive_users_list'])->name('getDeactiveUsers.api');
    Route::get('/getUsersList', [ApiUsersController::class, 'get_users_list'])->name('getUsers.api');
    Route::get('/getAvatarsList', [ApiUsersController::class, 'get_avatars_list'])->name('getAvatarsList.api');    
    //
    Route::post('/logout', [ApiAuthController::class, 'logout'])->name('logout.api');
    Route::post('/updateProfile', [ApiProfileController::class, 'update'])->name('updateProfile.api');
    Route::post('/uploadAvatar', [ApiProfileController::class, 'uploadAvatar'])->name('uploadAvatar.api');
    Route::post('/updatePassword', [ApiProfileController::class, 'updatePassword'])->name('updatePassword.api');
    Route::post('/uploadFile', [ApiUploadsController::class, 'upload'])->name('uploadFile.api');
    Route::post('/removeUser', [ApiUsersController::class, 'remove_user'])->name('removeUser.api');   
    Route::post('/restoreUser', [ApiUsersController::class, 'restore_user'])->name('restoreUser.api');   
    Route::post('/removeFile', [ApiUploadsController::class, 'remove_file'])->name('removeFile.api');
    Route::post('/updateDirStructs', [ApiUploadsController::class, 'update_dir_structs'])->name('updateDirStructs.api');
    Route::post('/updateCategoriesStructs', [ApiCategoriesController::class, 'update'])->name('updateCategoriesStructs.api');
    Route::post('/importSampleCategories', [ApiCategoriesController::class, 'import'])->name('importSampleCategories.api');
    Route::post('/importSampleTags', [ApiTagsController::class, 'import'])->name('importSampleTags.api');
    Route::post('/updateTagsStructs', [ApiTagsController::class, 'update'])->name('updateTagsStructs.api');
    Route::post('/publishPost', [ApiApTypeController::class, 'publish_post'])->name('publishPost.api');
    Route::post('/getCategoriesStructs', [ApiCategoriesController::class, 'get'])->name('getCategoriesStructs.api');
    Route::post('/getTagsStructs', [ApiTagsController::class, 'get'])->name('getTagsStructs.api');
    Route::post('/getPost', [ApiApTypeController::class, 'get_post'])->name('getPost.api');
    Route::post('/getPostsList', [ApiApTypeController::class, 'get_posts_list'])->name('getPostsList.api');
    Route::post('/removePost', [ApiApTypeController::class, 'remove_post'])->name('removePost.api');
    Route::post('/restorePost', [ApiApTypeController::class, 'restore_post'])->name('restorePost.api');
    //
    Route::post('/getPostTypesList', [ApiConfigurationController::class, 'get_post_types_list'])->name('getPostTypesList.api');
    Route::post('/createNewPostType', [ApiConfigurationController::class, 'create_new_post_type'])->name('createNewPostType.api');
    Route::post('/updatePostType', [ApiConfigurationController::class, 'update_post_type'])->name('updatePostType.api');
    Route::post('/removePostType', [ApiConfigurationController::class, 'remove_post_type'])->name('removePostType.api');
    Route::post('/restorePostType', [ApiConfigurationController::class, 'restore_post_type'])->name('restorePostType.api');
    
});