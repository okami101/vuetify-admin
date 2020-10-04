<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\MonsterChildController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\UserController;
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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::account();
    Route::impersonate();
    Route::upload();

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => UserController::class,
        'monsters' => MonsterController::class,
        'monster_children' => MonsterChildController::class,
        'books' => BookController::class,
    ]);
});
