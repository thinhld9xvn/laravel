<?php 
    namespace App\Classes\Uploads\b;
    use App\Models\Uploads;
    class RemoveAttachmentDBUtils {
        public static function perform($attachment_fn, $dir) {
            $row = Uploads::where([
                ["attachment", "=", $attachment_fn],
                ["dir", "=", $dir]
            ]);
            if ( !empty($row) ) :
                $row->delete();
            endif;
        }
    }