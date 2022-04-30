<?php
    namespace App\Classes\Utils;
    class FolderUtils {
        public static function getUploadDirPath($dirname) {
			return storage_path(FolderUtils::concatDFPath(["app/public/uploads", $dirname]));
	    }
        public static function getDirFromFilePath($path) {
			if ( !preg_match('/\//', $path) ) :
				return '/';
			endif;
            $pieces = explode('/', $path);
			array_pop($pieces);
            return implode('/', $pieces);
        }
        public static function concatDFPath($pieces) {
			$path = '';
			foreach($pieces as $key => $piece) :
				$spath = substr( $path, strlen( $path ) - 1 );
				$spiece = substr( $piece, 0, 1 );
				if ( empty($path) || 
						$spath === '/' || 
							$spiece === '/' ) :
					if ( $spath === '/' && $spiece === '/' ) :
						$path .= substr($piece, 1);
					else :
						$path .= $piece;
					endif;
				else :
					$path .= '/' . $piece;
				endif;
			endforeach;
			return $path;
		}
		public static function addSlashBeforePath($path) {
			if ( substr($path,strlen($path) - 1 ) === '/' ) :
				return $path;
			endif;
			return '/' . $path;
        }
    }