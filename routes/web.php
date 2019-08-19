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
use App\Lib\RouteConstants;

Route::middleware('verify_access_token')->get('/', function () {
    return view('home');
});

Route::middleware('verify_access_token')->get('/home', function () {
    return view('home');
})->name(RouteConstants::HOME);

Route::get('/locale/{locale}', 'LocalizationController@index')
    ->name(RouteConstants::LOCALIZATION);

Route::group([
    'prefix' => 'auth'
], function() {
    Route::get('/login', 'UserController@getLogin')
        ->name(RouteConstants::USER_GET_LOGIN)
        ->middleware('prevent_login_register_after_authenticated');
    Route::post('/login', 'UserController@postLogin')
        ->name(RouteConstants::USER_POST_LOGIN)
        ->middleware('prevent_login_register_after_authenticated');

    Route::get('/logout', 'UserController@getLogout')
        ->name(RouteConstants::USER_GET_LOGOUT);

    Route::post('/register', 'UserController@postRegister')
        ->name(RouteConstants::USER_POST_REGISTER)
        ->middleware('prevent_login_register_after_authenticated');

    Route::get('/change-password', 'UserController@getChangePassword')
        ->name(RouteConstants::USER_GET_CHANGE_PASSWORD);
    Route::post('/change-password', 'UserController@postChangePassword')
        ->name(RouteConstants::USER_POST_CHANGE_PASSWORD);

    Route::get('/view-user-profile', 'UserController@getViewUserProfile')
        ->name(RouteConstants::USER_GET_VIEW_USER_PROFILE);
});

Route::group([
    'prefix' => 'question'
], function() {
    Route::get('/ask', 'QuestionController@getAsk')
        ->name(RouteConstants::QUESTION_GET_ASK);
    Route::post('/ask', 'QuestionController@postAsk')
        ->name(RouteConstants::QUESTION_POST_ASK);
});

Route::group([
    'prefix' => 'question-description'
], function() {
    Route::post('/save', 'QuestionDescriptionController@postSave')
        ->name(RouteConstants::QUESTION_DESCRIPTION_POST_SAVE);
});
