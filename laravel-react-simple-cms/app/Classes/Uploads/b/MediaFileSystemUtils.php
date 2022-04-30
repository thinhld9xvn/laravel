<?php
    namespace App\Classes\Uploads\b;
    class MediaFileSystemUtils {
        private $avatarsDirPath;
        public function createUserAvatarDir($username) {
            $u_dir = sprintf("%s/%s", $this->avatarsDirPath, 
                                    $username);        
            if ( file_exists( $u_dir ) ) :
                //$this->deleteRecursiveDir( $u_dir );
            endif;
            mkdir($u_dir, 0777, true);
            return $u_dir;
        }
    }
