<?php
    namespace App\Classes\Utils\Files;
    class GetFileTypeUtils {
        public static function perform($ext) {
            $type = '';
			$typecode = 'other';
			$icon = 'other';
	        switch ( strtolower( $ext ) ) :
	            case 'jpg':
	            case 'jpeg':
	            case 'png':
	            case 'bmp':
	            case 'svg':
	            case 'gif':
	                $type = 'Hình ảnh';
	                $typecode = 'image';
					$icon = '';
	                break;
	            case 'doc':
				case 'docx':
					$type = 'Văn bản word';
					$typecode = 'word';
					$icon = 'word';
					break;
	            case 'xls':
				case 'xlsx':
					$type = 'Bảng tính excel';
					$typecode = 'excel';
					$icon = 'excel';
					break;
	            case 'pdf':
	                $type = 'Tài liệu pdf';
	                $typecode = 'portable document';
					$icon = 'pdf';
	                break;
	            case 'exe':
	                $type = 'Tập tin thực thi';                    
	                $typecode = 'execuable';
					$icon = 'exe';
	                break;
	            case 'php':
	                $type = 'Mã nguồn php';                    
	                $typecode = 'php source';
					$icon = 'php';
	                break;
	            default:
	                $type = 'Loại khác';
	                break;
			endswitch;
	        return array('type' => $type, 
						 'code' => $typecode,
						 'icon' => $icon );
        }
    }