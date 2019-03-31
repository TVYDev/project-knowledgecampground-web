<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('verify_access_token')->get('/home', function () {
    return view('home');
})->name('home');

Route::group([
    'prefix' => 'auth'
], function() {
    Route::get('/login', 'UserController@getLogin')
        ->name('user.getLogin')
        ->middleware('prevent_login_register_after_authenticated');

    Route::post('/login', 'UserController@postLogin')
        ->name('user.postLogin')
        ->middleware('prevent_login_register_after_authenticated');

    Route::get('/logout', 'UserController@getLogout')
        ->name('user.getLogout');

    Route::post('/register', 'UserController@postRegister')
        ->name('user.postRegister')
        ->middleware('prevent_login_register_after_authenticated');

    Route::get('/view-user-profile', 'UserController@getViewUserProfile')
        ->name('user.getViewUserProfile');
});
