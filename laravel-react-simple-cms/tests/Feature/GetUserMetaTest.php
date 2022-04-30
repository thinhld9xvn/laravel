<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Classes\Utils;
use App\Classes\Utils\UserMemberShip;

class GetUserMetaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {   
        $guid = 2;
        $uinfo = UserMemberShip::getUserMeta($guid);
        print_r($uinfo);
        $this->assertEquals(true, true);
    }
}
