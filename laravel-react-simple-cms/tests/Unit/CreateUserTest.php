<?php
namespace Tests\Unit;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Helpers\Profile\Api\ApiUpdateMeta;
use App\Classes\Users\a\UserDataFields as USER_DATA_FIELDS;
use App\Classes\Users\a\UserData as USER_DATA;
use App\Classes\Users\a\UserDBFields as USER_DB_FIELDS;
use App\Models\MetaData;
use App\Models\MetaStrings;
use Tests\TestCase;
class CreateUserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = User::create([
            'username' => 'thinhld9xvn',
            'email' => 'thinhld9xvn@gmail.com',
            'password' => Hash::make('Thinh123456@#')
        ]);
        $params = [
            USER_DATA_FIELDS::USER_DISPLAY_NAME => 'Lưu Đức Thịnh',
            USER_DATA_FIELDS::USER_AGE => 30,
            USER_DATA_FIELDS::USER_LOCATION => 'Đà Nẵng, Việt Nam',
            USER_DATA_FIELDS::USER_FIRST_NAME => 'Lưu',
            USER_DATA_FIELDS::USER_LAST_NAME => 'Thịnh',
            USER_DATA_FIELDS::USER_WEBSITE => 'http://gco.vn',
            USER_DATA_FIELDS::USER_ROLE_ID => 2
        ];
        if ( !isset($params[USER_DATA_FIELDS::USER_AVATAR]) ) :
            $params[USER_DATA_FIELDS::USER_AVATAR] = USER_DATA::USER_DEFAULT_AVATAR;
        endif;            
        if ( !isset($params[USER_DATA_FIELDS::USER_ABOUT_ME]) ) :
            $params[USER_DATA_FIELDS::USER_ABOUT_ME] = null;
        endif;
        $params[USER_DATA_FIELDS::USER_JOIN_DATE] = date('Y-m-d H:m:i', time());
        $params[USER_DATA_FIELDS::USER_STATUS] = USER_DATA::USER_PUBLIC;
        $params[USER_DATA_FIELDS::USER_IS_ONLINE] = USER_DATA::USER_OFFLINE;
        foreach ($params as $key => $value) :
            if ( $key === USER_DATA_FIELDS::USER_GUID || 
                    $key === USER_DATA_FIELDS::USER_EMAIL ) continue;
            ApiUpdateMeta::perform( null, 
                                    $key,
                                    $value,
                                    USER_DB_FIELDS::USERS_TABLE,
                                    $user);
        endforeach;
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;
        $this->assertTrue(true);
    }
}