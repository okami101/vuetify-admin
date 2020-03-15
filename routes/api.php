<?php

use App\Http\Resources\User as UserResource;
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

Route::middleware('auth:airlock')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

Route::group(['middleware' => ['auth:airlock', 'impersonate']], function () {
    /**
     * Profile management routes
     */
    Route::patch('account/update', 'AccountController@update')->name('account.update');
    Route::patch('account/password', 'AccountController@password')->name('account.password');

    /**
     * Impersonation routes
     */
    Route::post('/users/{user}/impersonate', 'UserController@impersonate');
    Route::post('/users/stop', 'UserController@stopImpersonate');

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => 'UserController',
        'authors' => 'AuthorController',
        'books' => 'BookController',
        'reviews' => 'ReviewController',
        'publishers' => 'PublisherController'
    ]);
});
