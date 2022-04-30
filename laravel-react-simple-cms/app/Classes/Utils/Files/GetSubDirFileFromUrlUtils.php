<?php
    namespace App\Classes\Utils\Files;
    use App\Classes\Utils\FolderUtils;

    class GetSubDirFileFromUrlUtils {
        public static function perform($path, $base = 'uploads') {
            $pathbase = FolderUtils::concatDFPath([$base, '/']);
            $pos = strpos($path, $pathbase);
            if ( FALSE !== $pos ) :
                $pos += strlen($pathbase);
                return substr($path, $pos);
            endif;
            return $path;
        }
    }