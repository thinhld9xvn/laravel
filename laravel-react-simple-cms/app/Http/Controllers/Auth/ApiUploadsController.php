<?php
namespace App\Http\Controllers\Auth;
use App\Classes\Uploads\b\UploadFileUtils;
use App\Helpers\Uploads\ApiValidationInput;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Classes\Uploads\a\UploadsDataFields as UPLOADS_DATA_FIELDS;
use App\Classes\Uploads\b\GetFileListUtils;
use App\Classes\Uploads\b\GetFolderListUtils;
use App\Classes\Uploads\b\RemoveFileUtils;
use App\Classes\Uploads\b\UpdateDirStructsUtils;
use App\Classes\Utils\ResponseUtils;
class ApiUploadsController extends Controller
{
    public function upload(Request $request) {
        $results = ApiValidationInput::perform($request, [
            UPLOADS_DATA_FIELDS::ATTACHMENT_FIELD => 'required',
            UPLOADS_DATA_FIELDS::DIR_FIELD => 'required'
        ]);
        if ( !$results['status'] ) {
            return ResponseUtils::error($results['error']);
        }
        $data = UploadFileUtils::perform($request);
        if (!empty($data->original['errors'])) :
            return ResponseUtils::error($data->original['errors']);
        endif;
        return ResponseUtils::success($data);
    }
    public function get_file_lists(Request $request) {
        $results = ApiValidationInput::perform($request, [
            UPLOADS_DATA_FIELDS::PATH_FIELD => 'required'
        ]);
        if ( !$results['status'] ) :
            return ResponseUtils::error($results['error']);
        endif;
        $dir = $request->input('path');
        $data = GetFileListUtils::perform($dir);
        return ResponseUtils::success(array_values($data));
    }
    public function get_folder_lists(Request $request) {
        $data = GetFolderListUtils::perform();
        return ResponseUtils::success(array_values($data));
    }
    public function remove_file(Request $request) {
        $results = ApiValidationInput::perform($request, [
            UPLOADS_DATA_FIELDS::ATTACHMENTS_FIELD => 'required',
            UPLOADS_DATA_FIELDS::DIR_FIELD => 'required'
        ]);
        if ( !$results['status'] ) {
            return ResponseUtils::error($results['error']);
        }
        RemoveFileUtils::perform($request);
        return ResponseUtils::success(true);
    }
    public function update_dir_structs(Request $request) {
        UpdateDirStructsUtils::perform($request);
        return ResponseUtils::success(true);
    }
}
