<?php
    namespace App\Classes\Utils\Files;
    class CheckIsImageTypeUtils {
        public static function perform($ext) {
            return in_array($ext, ['jpg',
									'jpeg',
									'png',
									'bmp',
									'svg',
									'gif']);
        }
    }