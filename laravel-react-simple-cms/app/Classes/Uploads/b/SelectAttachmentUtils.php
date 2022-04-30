<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Uploads\a\UploadsDataFields as UPLOAD_FIELDS;
    use App\Models\Uploads;
    class SelectAttachmentUtils {
        public static function perform($attachment, $dir = '/') {
            return Uploads::where(UPLOAD_FIELDS::ATTACHMENT_FIELD, $attachment)
                           ->where(UPLOAD_FIELDS::DIR_FIELD, $dir)
                           ->get()->first()->toArray();
        }
    }