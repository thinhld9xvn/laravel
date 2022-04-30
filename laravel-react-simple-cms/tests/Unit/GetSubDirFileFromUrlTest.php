<?php
namespace Tests\Unit;

use App\Classes\Utils\Files\GetSubDirFileFromUrlUtils;
use Tests\TestCase;
class GetSubDirFileFromUrlTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        echo GetSubDirFileFromUrlUtils::perform('http://127.0.0.1:8000/storage/uploads/banner1-150x150.jpg', 'uploads');
        $this->assertTrue(true);
    }
}
