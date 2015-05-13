<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'MainController@index');

Route::post('/', 'SessionController@login');

Route::get('home', 'HomeController@index');

Route::post('login', 'MainController@login');

Route::post('register', 'MainController@register');

Route::post('addRequest', 'MainController@addRequest');

Route::get('venueProfile/{id}', 'MainController@venueProfile');

Route::get('userProfile/{id}', 'MainController@userProfile');

Route::get('getSongs/{id}', 'MainController@songBook');

Route::get('getRequests', 'MainController@getRequests');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
