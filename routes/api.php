<?php

use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;

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

Route::middleware('auth:airlock')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

Route::group(['middleware' => 'auth:airlock'], function () {
    /**
     * Profile management routes
     */
    Route::patch('account/update', 'AccountController@update')->name('account.update');
    Route::patch('account/password', 'AccountController@password')->name('account.password');

    /**
     * API resources controllers
     */
    Route::apiResources([
        'authors' => 'AuthorController',
        'books' => 'BookController',
        'reviews' => 'ReviewController',
        'publishers' => 'PublisherController'
    ]);
});
