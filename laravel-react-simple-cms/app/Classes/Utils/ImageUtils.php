<?php 
	namespace App\Classes\Utils;
	use Illuminate\Support\Facades\Storage;
	use Intervention\Image\ImageManagerStatic as Image;
	use App\Classes\Uploads\a\ImageDataFields as IMAGE_DT_FIELDS;
	use App\Classes\Uploads\a\ImageDataFields;

class ImageUtils {
		public static function getDFThumbnailSizes() {
			return array(
				'thumbnail' => array(150, 150),
				'medium' => array(300, 300),
				'large' => array(1024, 768)
			);
		}
		public static function getDFThumbSize() {
			$sizes = self::getDFThumbnailSizes();
			return $sizes['thumbnail'];
		}
		public static function getImageBase64Src( $imagePath ) {
			$finfo = new \finfo(FILEINFO_MIME_TYPE);
			$type = $finfo->file($imagePath);
			return 'data:'.$type.';base64,'.base64_encode( file_get_contents($imagePath) );
		}
		// @param size: kích thước thực tế của ảnh
		// @param origin: kích thước thumbnail cần so sánh
		// @return : trả về kích thước mới (nhỏ hơn kích thước thực tế)
		//			 hoặc trả về {size} nếu {origin} < {size}
		public static function getRealThumbnailSize($size, $origin) {
			list($thumb_width, $thumb_height) = $origin;
			list($width, $height) = $size;
			$new_width = $thumb_width;
			$new_height = $thumb_height;
			if ( $thumb_width > $width ) :
				$new_width = $width;
			endif;
			if ( $thumb_height > $height ) :
				$new_height = $height;
			endif;
			return [$new_width, $new_height];				
		}
		public static function getSize($fn, $gd = null) {
			$image_gd = $gd === null ? Image::make($fn) : $gd;
			$image_width = $image_gd->width();
			$image_height = $image_gd->height();
			return [$image_width, $image_height];
		}
		public static function getImageName($image, $size) {
			$ext = FileUtils::getFileExt($image);
			$fn = FileUtils::getFileName(FileUtils::getFileName($image));		
			if ( !empty($size) ) :
				list($width, $height) = $size;
				return "{$fn}-{$width}x{$height}.{$ext}";
			endif;
			return "{$fn}.{$ext}";
		}
		public static function getImageUrl($fn, $size, $dir = '/') {			
			$filename = self::getImageName($fn, $size);
			$attachment = FolderUtils::concatDFPath([$dir, $filename]);
			//return asset("storage/uploads{$attachment}");
			return FileUtils::getUploadFileUrl($attachment);
		}
		public static function save($uploaded, $fnSave, $dir, $quality = 75) {
			$ext = FileUtils::getFileExt($fnSave);
			$svDirPath = FolderUtils::concatDFPath(["public/uploads", $dir]);
			$path = FileUtils::getStorageFilePath($fnSave, $dir);
			$is_image = FileUtils::isImageType($ext);
			if ( !$is_image ) :
				Storage::putFileAs($svDirPath, $uploaded, $fnSave);
				$size = Storage::size(FolderUtils::concatDFPath([$svDirPath, $fnSave]));
			endif;
			if ( $is_image ) :
				$image_gd = Image::make($uploaded); 				
				$image_gd->save($path, $quality);
				$size = $image_gd->filesize();
			endif;
			return [
				IMAGE_DT_FIELDS::PATH_FIELD => $path,
				IMAGE_DT_FIELDS::SIZE_FIELD => $size
			];
		}
		public static function saveAvatar($uploaded, $dir, $fnSave = ImageDataFields::AVATAR_IMAGE) {
			$ext = FileUtils::getFileExt($fnSave);
			if ( !FileUtils::isImageType($ext) ) return false;
			$svDirPath = FolderUtils::concatDFPath(["public/avatars", $dir]);
			if ( !Storage::exists($svDirPath) ) :
				Storage::makeDirectory($svDirPath);
			endif;
			Storage::putFileAs($svDirPath, $uploaded, $fnSave);
		}
		public static function crop($origin, $cropped, $size, $quality = 75) {
			$image_gd = Image::make($origin);
			list($image_width, $image_height) = self::getSize($origin, $image_gd);
			list($new_width, $new_height) = self::getRealThumbnailSize([$image_width, $image_height], $size);
			if ( $new_width !== $image_width || $new_height !== $image_height ) :
				list($thumb_width, $thumb_height) = $size;
				$width = $thumb_width;
				$height = $thumb_width * ($image_height / $image_width);
				$image_gd->resize($width, $height);				
				$image_gd->crop($new_width, $new_height);
				$image_gd->fill('#fff', 0, 0);
				$image_gd->save($cropped, $quality);
				return true;
			endif;
			return false;
		}			
		/*
			@param {client} : filename phía client trước khi upload
			@param {source} : file cần crop (sau khi đã đc upload *.tmp)
			@param {dest} : đường dẫn đầy đủ file tương ứng khi save {source} vào uploads
			@return : trả về mảng chứa các kích thước đã crop && các filepath tương ứng
		*/
		public static function cropByDFSizes($client, $source, $dest) {
			$att_fsizes = [];
            $att_sizes = [];
			$sizes_defined = self::getDFThumbnailSizes();            
            foreach ( $sizes_defined as $key => $size) :
				$path = explode('/', $dest);
				array_pop($path);
				$path = implode('/', $path);
				$attachment_crop_fn = FolderUtils::concatDFPath([$path, ImageUtils::getImageName($client, $size)]);
				$ext = FileUtils::getFileExt($attachment_crop_fn);
				$can_crop = FileUtils::canFileCrop($ext);
				if ( $can_crop ) :
					$results = ImageUtils::crop($source, $attachment_crop_fn, $size);
					if ( $results ) :
						$att_fsizes[$key] = file_exists($attachment_crop_fn) ? basename($attachment_crop_fn) : 
																				$dest;
						$att_sizes[$key] = $size;
					endif;
				endif;
            endforeach;
			return [
				IMAGE_DT_FIELDS::ATTACHMENTS_FIELD => $att_fsizes,
				IMAGE_DT_FIELDS::SIZES_FIELD => $att_sizes,
				IMAGE_DT_FIELDS::CROPPED_FIELD => $can_crop
			];
		}

		public static function getAvailableImageSizes($imageFn, $dir = '/') {
			$results = [];
			$sizes = self::getDFThumbnailSizes();
			foreach($sizes as $key => $size) :
				$fn = self::getImageName($imageFn, $size);
				if ( FileUtils::checkExist($fn, $dir) ) :
					$results[$key] = $size;
				endif;
				if ( last($sizes) === $size ) :
					$pathFn = FileUtils::getStorageFilePath($imageFn, $dir);
					if ( FileUtils::isImageFile($pathFn) ) :
						$results['full'] = self::getSize($pathFn);
					endif;
				endif;
			endforeach; 
			return !empty($results) ? $results : null;
		}
	}