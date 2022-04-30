<?php
    namespace App\Classes\Utils\Files;
    class CheckCanFileCropUtils {
        public static function perform($ext) {
            return in_array($ext, ['jpg',
									'jpeg',
									'png']);
        }
    }