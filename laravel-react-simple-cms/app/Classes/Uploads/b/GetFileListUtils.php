<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\FileUtils;
use App\Classes\Utils\FolderUtils;
use Illuminate\Support\Facades\Storage;
    class GetFileListUtils {        
        public static function perform($dir) {
            $fileLists = array_filter(Storage::disk('uploads')->files($dir), function($item) {
                return !preg_match('/(.+)-[0-9]{1,}x[0-9]{1,}(.+)/', $item);
            });
            return array_map(function($item) {
                $attachment = basename($item);
                $ext = FileUtils::getFileExt($item);
                $dir = FolderUtils::addSlashBeforePath(FolderUtils::getDirFromFilePath($item));
                $attachment = SelectAttachmentUtils::perform($attachment, $dir);                
                $attachment_info = FileUtils::getFileInfo($attachment, $ext);
                return $attachment_info;
            }, $fileLists);
        }
    }