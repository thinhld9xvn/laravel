<?php 
    namespace App\Classes\Uploads\b;

use App\Classes\Utils\FileUtils;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
    class GetAvatarsListUtils {      
        public static function perform() {
            $users = User::all();
            $avatarsList = array_filter(Storage::disk('avatars')->files(), function($item) {
                return preg_match('/[0-9]{2,}.png/', $item);
            });
            foreach ($users as $key => $user) :
                $username = $user->username;
                $avatarsList = array_merge($avatarsList, 
                                            array_filter(Storage::disk('avatars')->files($username), 
                                            function($item) {
                    return preg_match('/avatar.(jpg|jpeg|png)/', $item);
                }));
            endforeach;
            return array_map(function($item) {
                //return asset("/storage/avatars/{$item}");
                return FileUtils::getUploadAvatarUrl($item);
            }, $avatarsList);
        }
    }