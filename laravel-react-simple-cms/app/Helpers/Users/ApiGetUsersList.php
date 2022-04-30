<?php 
    namespace App\Helpers\Users;
    use App\Classes\Utils\UserMemberShip;
    use App\Models\User;
    class ApiGetUsersList {
        public static function get($status = 'public') {
            $data = ['public' => [], 'trash' => []];
            $rows = User::all()->toArray();        
            foreach ($rows as $key => $user ) :
                $meta = UserMemberShip::getUserMeta($user['guid']);
                $userSt = $meta['status'];
                $data[$userSt][] = array_merge($user, $meta);
            endforeach;
            if ($status === 'all') :
                return $data;
            endif;
            return $data[$status];
        }
    }