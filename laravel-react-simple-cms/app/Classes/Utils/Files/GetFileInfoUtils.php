<?php
    namespace App\Classes\Utils\Files;

    use App\Classes\Utils\FileUtils;
use App\Classes\Utils\FolderUtils;
use App\Classes\Utils\ImageUtils;
use Illuminate\Support\Facades\Storage;

class GetFileInfoUtils {
        public static function perform($attachmentDB, $ext) {
            $dir = $attachmentDB['dir'];
            $file_type = GetFileTypeUtils::perform($ext);
			$thumbnail_size = ImageUtils::getDFThumbSize();
            $can_crop = FileUtils::canFileCrop($ext);
            $sizes = ImageUtils::getAvailableImageSizes($attachmentDB['attachment'], $dir);
            $path = FolderUtils::concatDFPath(["public/uploads", $dir, $attachmentDB['attachment']]);            
			return [
                'name' =>  $attachmentDB['attachment'],
                'url' => FileUtils::getUploadFileUrl($attachmentDB['attachment'], $dir),
                'thumbnail' => $can_crop ? (array_key_exists('thumbnail', $sizes) ? ImageUtils::getImageUrl($attachmentDB['attachment'],													   
                                                                                                                $thumbnail_size,
                                                                                                                $dir) : 
                                                                                    ImageUtils::getImageUrl($attachmentDB['attachment'],													   
                                                                                                                    null,
                                                                                                                    $dir)) : '',
                'active' => false,
                'info' => [
                    'id' => $attachmentDB['id'],
                    'title' => $attachmentDB['title'],
                    'alt' => $attachmentDB['alt'],
                    'description' => $attachmentDB['description']
                ],
                'type' => [
                    'label' => $file_type['type'],
                    'code' => $file_type['code'],
                    'icon' => $file_type['icon']
                ],
                'length' => Storage::size($path),
                'datecreated' => date("d-m-Y H:i:s", Storage::lastModified($path)),
                'sizes' => $sizes,
                'upload' => [
                    'stat' => false,
                    'percentage' => 0,
                    'error' => array(
                        'stat' => false,
                        'message' => ""
                    )
                ]
			];
        }
    }