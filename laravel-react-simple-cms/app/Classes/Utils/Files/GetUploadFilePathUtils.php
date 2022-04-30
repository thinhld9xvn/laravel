<?php
    namespace App\Classes\Utils\Files;
use App\Classes\Utils\FolderUtils;
use App\Classes\Utils\ImageUtils;
    class GetUploadFilePathUtils {
        public static function perform($fn, $size = []) {
            $filename = ImageUtils::getImageName($fn, $size);			
			return storage_path(FolderUtils::concatDFPath(['app/public/uploads', $filename]));
        }
    }