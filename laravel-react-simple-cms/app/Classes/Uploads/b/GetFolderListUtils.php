<?php 
    namespace App\Classes\Uploads\b;
    use App\Classes\Utils\Folders\GetDirInfoUtils;
    use App\Classes\Utils\Folders\TraveselArrayTreeListUtils;
    use Illuminate\Support\Facades\Storage;
    class GetFolderListUtils {
        public static function perform() {
            $foldersList = [];
            $foldersList[] = GetDirInfoUtils::perform(['name' => '/', 
                                                        'path' => '/']);
            foreach(Storage::disk('uploads')->directories('/', true) as $key => $name) :
                $n = basename($name);
                $info = GetDirInfoUtils::perform(['name' => $n, 'path' => "/{$name}"]);
                TraveselArrayTreeListUtils::perform($foldersList, $info);
            endforeach;
            return $foldersList;
        }
    }