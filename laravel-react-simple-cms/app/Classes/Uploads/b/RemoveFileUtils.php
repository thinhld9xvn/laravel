<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\FileUtils;
use App\Classes\Utils\FolderUtils;
use App\Classes\Utils\ImageUtils;
    use Illuminate\Support\Facades\Storage;

    class RemoveFileUtils {
        private static function delete($dir, $fn) {
            Storage::delete(FolderUtils::concatDFPath(["public/uploads", $dir, $fn]));
        }
        public static function perform($request) {
            $dir = $request->input('dir');
            $attachments = json_decode($request->input('attachments'), true);
            foreach( $attachments as $key => $attachment ) :   
                $att_name = $attachment['name'];            
                if ( FileUtils::isImageFile($att_name) ) {
                    //$st_path = FileUtils::getStorageFilePath($att_name, $dir);
                    $sizes = ImageUtils::getAvailableImageSizes($att_name, $dir);
                    foreach($sizes as $key => $size) :
                        $imagefn = ImageUtils::getImageName($att_name, $size);
                        self::delete($dir, $imagefn);
                    endforeach;
                }
                RemoveAttachmentDBUtils::perform($att_name, $dir);
                self::delete($dir, $att_name);
            endforeach;
        }
    }