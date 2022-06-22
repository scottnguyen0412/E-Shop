<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\ProductController;
use App\Http\Controllers\API\Frontend\FrontendController;



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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/getCategory', [FrontendController::class,'category']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
    Route::get('/checkAuthenticated', function () {
        return response()->json(['messages' => 'You are in', 'status' => 200], 200);
    });

    // Category
    Route::post('/store-category',[CategoryController::class, 'store']);
    Route::get('/view-category',[CategoryController::class, 'index']);
    Route::get('/edit-category/{id}', [CategoryController::class, 'edit']);
    Route::post('/update-category/{id}', [CategoryController::class,'update']);
    Route::delete('/delete-category/{id}', [CategoryController::class, 'delete']);
    Route::get('/all-category',[CategoryController::class,'allcategory']);

    // Product
    Route::post('/store-product', [ProductController::class, 'store']);
    Route::get('/view-product', [ProductController::class, 'index']);
    Route::get('/edit-product/{id}',[ProductController::class, 'edit']);
    Route::post('/update-product/{id}',[ProductController::class,'update']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
