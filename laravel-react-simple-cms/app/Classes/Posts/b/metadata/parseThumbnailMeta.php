<?php  
    namespace App\Classes\Posts\b\metadata;
    use App\Classes\Utils\FileUtils;
    class ParseThumbnailMeta {
        public static function perform($value) {
            $thumbnail = $value ? FileUtils::getUploadFileUrl($value) : '';
            return ['src' => !empty($thumbnail) ? $thumbnail : '',
                            'pathname' => !empty($thumbnail) ? $value : '',
                            'alt' => !empty($thumbnail) ? basename($value) : ''];
        }
    }