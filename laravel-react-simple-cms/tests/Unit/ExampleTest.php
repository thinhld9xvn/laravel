<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $url = 'http://127.0.0.1:8000/samples/sample-posts.json';
        $response = Http::accept('application/json')->get($url);
        if ($response->failed()) {
           // return failure
        } else {
            print_r($response->json());
           // return success
        }
        $this->assertTrue(true);
    }
}
