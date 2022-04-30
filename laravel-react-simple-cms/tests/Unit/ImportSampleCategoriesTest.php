<?php
namespace Tests\Unit;

use App\Helpers\Categories\ImportSampleHelper;
use Tests\TestCase;
class ImportSampleCategoriesTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        ImportSampleHelper::perform();
        $this->assertTrue(true);
    }
}