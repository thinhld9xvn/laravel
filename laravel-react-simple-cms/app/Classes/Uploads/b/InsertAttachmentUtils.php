<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\FileUtils;
    use App\Models\Uploads;
    class InsertAttachmentUtils {
        public static function perform($attachment_fn, $dir) {
            $attachment = new Uploads();
            $attachment->attachment = $attachment_fn;        
            $attachment->title = FileUtils::getFileName($attachment_fn);
            $attachment->alt = FileUtils::getFileName($attachment_fn);
            $attachment->description = '';
            $attachment->dir = $dir;
            $attachment->save();
            return $attachment->id;
        }
    }