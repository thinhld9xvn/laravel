<?php

namespace Tests\Unit;

use App\Helpers\PostTypes\Api\ApiRemovePostType;
use Tests\TestCase;
class RemovePostTypeTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
       ApiRemovePostType::perform(['clients'], 'remove_permantly');
        $this->assertTrue(true);
    }
}
