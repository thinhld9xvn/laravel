<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\FileUtils;
    use App\Classes\Utils\ImageUtils;
    use Symfony\Component\HttpFoundation\Response;
    use App\Classes\Uploads\a\ImageDataFields;
use App\Classes\Utils\FolderUtils;
use Exception;    
    class UploadFileUtils {
        public static function perform($request) {
            $options = $request->input('options');
            $dir = $request->input('dir');
            $attachment = $request->file('attachment');
            $attachment_fullpath = $attachment->getRealPath();
            $attachment_fn = $attachment->getClientOriginalName();
            $attachment_thumb_cropped = '';
            if ( isset( $options ) ) :
                extract(json_decode( $options, true ));
                if ( isset($newFileName) ) :
                    $attachment_fn = $newFileName;
                endif;
            endif;
            $ftp = FileUtils::getFileType( FileUtils::getFileExt($attachment_fn) );
            $isv = ImageUtils::save($attachment_fullpath, $attachment_fn, $dir);             
            $ics = ImageUtils::cropByDFSizes($attachment_fn, $attachment_fullpath, 
                                                             $isv['path']);
            if ( !empty( $ics['sizes'] ) ) :
                $ics['sizes']['full'] = ImageUtils::getSize($attachment_fullpath);
            endif;            
            try {
                $att_uid = InsertAttachmentUtils::perform($attachment_fn, $dir);
            } catch(Exception $e) {
                return response(['errors'=> $e->getMessage()],
                                    Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ( array_key_exists('thumbnail', $ics['sizes']) ) : 
                $attachment_thumb_cropped = ImageUtils::getImageName($attachment_fn, $ics['sizes']['thumbnail']);
                $attachment_thumb_cropped = FolderUtils::concatDFPath([$dir, $attachment_thumb_cropped]);
            endif;
            
            $fp = $ics[ImageDataFields::CROPPED_FIELD] ? ($attachment_thumb_cropped ? $attachment_thumb_cropped : 
                                                                                       FolderUtils::concatDFPath([$dir, $attachment_fn])) : 
                                                            FolderUtils::concatDFPath([$dir, $attachment_fn]);
            return [
                'name' => $attachment_fn,
                'url' => FileUtils::getUploadFileUrl($attachment_fn, $dir),
                'thumbnail' => $ftp['code'] === 'image' ? ( $ics[ImageDataFields::CROPPED_FIELD] ? FileUtils::getUploadFileUrl($fp) : 
                                                                                                    FileUtils::getUploadFileUrl($attachment_fn) ) : '',
                'active' => false,
                'upload' => array(
                    'stat' => false,
                    'percentage' => 100,
                    'error' => array(
                        'stat' => false,
                        'message' => ''
                    )
                ),
                'info' => array(
                    'id' => $att_uid,
                    'title' => FileUtils::getFileName($attachment_fn),
                    'alt' => '',
                    'description' => ''
                ),
                'type' => array(
                    'label' => $ftp['type'],
                    'code' => $ftp['code'],
                    'icon' => $ftp['icon']
                ),
                'length' => $isv['size'],
                'datecreated' => date("d-m-Y H:i:s A", filectime( $isv['path'] )),
                'sizes' => !empty($ics['sizes']) ? $ics['sizes'] : ''
            ];	
        }
    }