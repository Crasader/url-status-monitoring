<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(array('prefix' => 'v1'), function()
{
	Route::post('login', 'API\UserController@login');
	Route::post('register', 'API\UserController@register');

	Route::group(['middleware' => 'auth:api'], function(){
		Route::get('urls', 'API\UrlController@getAllUrls');
		Route::post('urls', 'API\UrlController@createUrl');
		Route::get('urls/{id}', 'API\UrlController@getUrl');
		Route::delete('urls/{id}', 'API\UrlController@deleteUrl');
		Route::patch('urls/{id}', 'API\UrlController@updateUrl');
	});
});
