<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
    	//authorized login test
        $response = $this->json('POST', '/api/v1/login', ['username' => 'mahmoud', 'password' => '123456']);
        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => [],
        ]);
    }

    public function testExample2()
    {
    	//unauthorized login test
        $response = $this->json('POST', '/api/v1/login', ['username' => 'not exists username', 'password' => '123456']);
        $response
            ->assertStatus(401)
            ->assertJson([
                'error' => 'Unauthorised',
        ]);
    }

    // public function testExample3()
    // {
    // 	//successful registration
    //     $response = $this->json('POST', '/api/v1/register', ['username' => 'justfortest', 'email' => 'justfortest@domain.com', 'password' => '123456', 'c_password' => '123456']);
    //     $response
    //         ->assertStatus(200)
    //         ->assertJson([
    //             'success' => [],
    //     ]);
    // }

    public function testExample4()
    {
    	//unsuccessful registration
        $response = $this->json('POST', '/api/v1/register', ['username' => '', 'email' => 'justfortest@domain.com', 'password' => '123456', 'c_password' => '123456']);
        $response
            ->assertStatus(400)
            ->assertJson([
                'error' => [],
        ]);
    }
}
