<?php 
    namespace App\Helpers\Users;
    use App\Classes\Uploads\a\ImageDataFields;
    use App\Classes\Users\a\UserNewDataFields as USER_NEW_DATA_FIELDS;
    use App\Classes\Utils\FileUtils;
    use App\Classes\Utils\ImageUtils;
    use Illuminate\Http\Request;
    class ApiUploadAvatar {
        public static function perform(Request $request) {
            $avatar_name = ImageDataFields::AVATAR_IMAGE;
            $avatar_uploaded = $request->file(USER_NEW_DATA_FIELDS::USER_AVATAR);
            $username = $request->input(USER_NEW_DATA_FIELDS::USER_NAME);
            $attachment_fullpath = $avatar_uploaded->getRealPath();
            ImageUtils::saveAvatar($attachment_fullpath, $username);
            //return asset("{$username}/{$avatar_name}");
            return FileUtils::getUploadAvatarUrl("{$username}/{$avatar_name}");
        }
    }