<?php
    namespace App\Http\Controllers\Auth;
    use Illuminate\Http\Request;
    use App\Http\Controllers\Controller;
    use App\Helpers\Profile\UpdateHelper;
    use App\Helpers\Profile\UpdatePasswordHelper;
    use App\Helpers\Profile\UploadAvatarHelper;
    class ApiProfileController extends Controller
    {
        public function update(Request $request) {
            return UpdateHelper::perform($request);
        }
        public function updatePassword(Request $request) {
            return UpdatePasswordHelper::perform($request);
        }
        public function uploadAvatar(Request $request) {
            return UploadAvatarHelper::perform($request);
        }
    }
