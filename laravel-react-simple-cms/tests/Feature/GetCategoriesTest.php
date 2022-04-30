<?php

namespace Tests\Feature;

use App\Classes\Categories\b\GetTreeListsData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Classes\Utils;
use App\Classes\Utils\UserMemberShip;

class GetCategoriesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {   
        echo "<pre>";
        print_r(GetTreeListsData::perform());
        $this->assertEquals(true, true);
    }
}
