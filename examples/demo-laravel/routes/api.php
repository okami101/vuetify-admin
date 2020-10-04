<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\ReviewController;
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

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::account();
    Route::impersonate();
    Route::upload();

    /**
     * Tree specific routes
     */
    Route::get('categories/tree', [CategoryController::class, 'tree']);
    Route::get('categories/nodes/{parentId?}', [CategoryController::class, 'nodes']);
    Route::patch('categories/{category}/move', [CategoryController::class, 'move']);

    /**
     * API resources controllers
     */
    Route::apiResources([
        'users' => UserController::class,
        'authors' => AuthorController::class,
        'books' => BookController::class,
        'reviews' => ReviewController::class,
        'publishers' => PublisherController::class,
        'categories' => CategoryController::class,
    ]);
});
