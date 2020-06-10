<?php

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use Vtec\Crud\Http\Middleware\Impersonate;

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

Route::group(['middleware' => Impersonate::class], function () {
    Route::get('/user', function (Request $request) {
        if ($user = $request->user()) {
            return new UserResource($user, true);
        }
    });

    Route::account();
    Route::impersonate();
    Route::upload();

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => 'UserController',
        'authors' => 'AuthorController',
        'books' => 'BookController',
        'reviews' => 'ReviewController',
        'publishers' => 'PublisherController',
    ]);
});
