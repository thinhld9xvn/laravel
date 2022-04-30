<?php
    namespace App\Classes\Utils;
	use App\Classes\Utils\Files\CheckCanFileCropUtils;
	use App\Classes\Utils\Files\CheckIsImageTypeUtils;
	use App\Classes\Utils\Files\GetSubDirFileFromUrlUtils;
	use App\Classes\Utils\Files\GetFileInfoUtils;
	use App\Classes\Utils\Files\GetFileTypeUtils;
	use App\Classes\Utils\Files\GetUploadFilePathUtils;
	use Illuminate\Support\Facades\Storage;

class FileUtils {
	public static function getFileType($ext) {
		return GetFileTypeUtils::perform($ext);
	}
	public static function canFileCrop($ext) {
		return CheckCanFileCropUtils::perform($ext);
	}
	public static function isImageType( $ext ) {
		return CheckIsImageTypeUtils::perform($ext);
	}
	public static function isImageFile($fn) {
		return self::isImageType(self::getFileExt($fn));
	}
	public static function getFileName($filename) {
		return pathinfo($filename, PATHINFO_FILENAME);
	}
	public static function getFileExt($filename) {
		return pathinfo($filename, PATHINFO_EXTENSION);
	}
	public static function getUploadFilePath($fn, $size = []) {
		return GetUploadFilePathUtils::perform($fn, $size);
	}
	public static function getFileInfo($attachmentDB, $ext) {
		return GetFileInfoUtils::perform($attachmentDB, $ext);
	}
	public static function getStorageFilePath($file, $dir = '/', $uploads_dir = 'uploads') {
		return storage_path(FolderUtils::concatDFPath(['app/public/', $uploads_dir, $dir, $file]));
	}
	public static function getUploadFileUrl($file, $dir = '/', $uploads_dir = 'uploads') {
		$path = FolderUtils::concatDFPath(['/storage/', $uploads_dir, $dir, $file]);
		return asset($path);
	}
	public static function getUploadAvatarUrl($file, $dir = '/', $uploads_dir = 'avatars') {
		return self::getUploadFileUrl($file, $dir, $uploads_dir);
	}
	public static function getSubDirFileFromUrl($path) {
		return GetSubDirFileFromUrlUtils::perform($path);
	}
	public static function checkExist($fn, $dir = '/') {
		return Storage::disk('uploads')->exists(FolderUtils::concatDFPath([$dir, $fn]));
	}
	
}