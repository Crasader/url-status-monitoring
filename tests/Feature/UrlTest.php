<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User; 

class UrlTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
    	//get all urls test
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $response = $this->json('GET', '/api/v1/urls');
        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => [],
        ]);
    }

    public function testExample2()
    {
        //create new url test
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $response = $this->json('POST', '/api/v1/urls',['url' => 'www.test.com']);
        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => [],
        ]);
    }

    public function testExample3()
    {
        //get url test
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $response = $this->json('GET', '/api/v1/urls/0');
        $response
            ->assertStatus(404)
            ->assertJson([
                "error" => "url not found or not belongs to user"
        ]);
    }

    public function testExample4()
    {
        //delete url test
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $response = $this->json('DELETE', '/api/v1/urls/0');
        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => [],
        ]);
    }

    public function testExample5()
    {
        //update url test
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $response = $this->json('PATCH', '/api/v1/urls/0');
        $response
            ->assertStatus(404)
            ->assertJson([
                "error" => "url not found or not belongs to user"
        ]);
    }

}
