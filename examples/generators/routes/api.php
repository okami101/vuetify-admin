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

Route::group(['middleware' => Impersonate::class], function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    });

    Route::account();
    Route::impersonate();
    Route::upload();

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => 'UserController',
        'monsters' => 'MonsterController',
        'monster_children' => 'MonsterChildController',
    ]);
});
