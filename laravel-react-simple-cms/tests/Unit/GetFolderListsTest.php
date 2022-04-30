<?php
namespace Tests\Unit;

use App\Classes\Uploads\b\GetFolderListUtils;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
class GetFolderListsTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        print_r(GetFolderListUtils::perform());
        $this->assertTrue(true);
    }
}
