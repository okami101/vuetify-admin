<?php

use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::account();
    Route::impersonate();
    Route::upload();

    /**
     * Tree specific routes
     */
    Route::get('categories/tree', 'CategoryController@tree');
    Route::get('categories/nodes/{parentId?}', 'CategoryController@nodes');
    Route::patch('categories/{category}/move', 'CategoryController@move');

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => 'UserController',
        'authors' => 'AuthorController',
        'books' => 'BookController',
        'reviews' => 'ReviewController',
        'publishers' => 'PublisherController',
        'categories' => 'CategoryController',
    ]);
});
