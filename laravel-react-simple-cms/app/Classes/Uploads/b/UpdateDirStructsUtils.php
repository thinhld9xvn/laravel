<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\FolderUtils;
    use App\Models\Uploads;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;

    class UpdateDirStructsUtils {        
        public static function perform(Request $request) {
            $old_path = $request->input('old_path');
            $new_path = $request->input('new_path');
            $path = $request->input('path');
            $action = $request->input('action');
            if ( !empty($action) && !empty($path) ) :
                Storage::deleteDirectory(FolderUtils::concatDFPath(["public/uploads", $path]));
                Uploads::where("dir", "LIKE", "{$path}%")
                        ->delete();
                return;
            endif;
            if ( empty( $old_path ) && !empty($new_path) ) :
                Storage::makeDirectory(FolderUtils::concatDFPath(["public/uploads", $new_path]));
            else :
                if ( !empty($old_path) && 
                        !empty($new_path) ) :
                    $old_dir = FolderUtils::getUploadDirPath($old_path);
                    $new_dir = FolderUtils::getUploadDirPath($new_path);
                    rename($old_dir, $new_dir);
                    $rows = Uploads::where("dir", "LIKE", "{$old_path}%")->get()->toArray();
                    foreach ( $rows as $key => $row ) :
                        $myRow = Uploads::find($row['id']);
                        $myRow->dir = str_replace($old_path, $new_path, $row['dir']);
                        $myRow->save();
                    endforeach;
                endif;
            endif;
        }
    }