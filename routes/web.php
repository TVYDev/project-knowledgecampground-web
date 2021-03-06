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
    'prefix' => 'social-auth'
    ], function() {
        Route::get('/{provider}/redirect', 'SocialAuthController@redirectToSocialProvider')
            ->name(RouteConstants::SOCIAL_AUTH_GET_REDIRECT);
        Route::get('/{provider}/callback', 'SocialAuthController@handleSocialProviderCallback');
});

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
    Route::get('/edit-user-profile', 'UserController@getEditUserProfile')
        ->name(RouteConstants::USER_GET_EDIT_USER_PROFILE);
    Route::post('/edit-user-profile', 'UserController@postEditUserProfile')
        ->name(RouteConstants::USER_POST_EDIT_USER_PROFILE);

    Route::get('/request-reset-password-link', 'UserController@getRequestResetPasswordLink')
        ->name(RouteConstants::USER_GET_REQUEST_RESET_PASSWORD_LINK);
    Route::post('/request-reset-password-link', 'UserController@postRequestResetPasswordLink')
        ->name(RouteConstants::USER_POST_REQUEST_RESET_PASSWORD_LINK);
    Route::get('/reset-password', 'UserController@getResetPassword')
        ->name(RouteConstants::USER_GET_RESET_PASSWORD);
    Route::post('/reset-password', 'UserController@postResetPassword')
        ->name(RouteConstants::USER_POST_RESET_PASSWORD);
});

Route::group([
    'prefix' => 'question'
], function() {
    Route::get('/post', 'QuestionController@getPost')
        ->name(RouteConstants::QUESTION_GET_POST);
    Route::post('/post', 'QuestionController@postPost')
        ->name(RouteConstants::QUESTION_POST_POST);
    Route::get('/edit/{publicId}', 'QuestionController@getEdit')
        ->name(RouteConstants::QUESTION_GET_EDIT);

    Route::post('/save-during-editing', 'QuestionController@postSaveDuringEditing')
        ->name(RouteConstants::QUESTION_POST_SAVE_DURING_EDITING);

    Route::get('/view/{publicId}', 'QuestionController@getView')
        ->name(RouteConstants::QUESTION_GET_VIEW);

    Route::get('/get-info/{publicId}', 'QuestionController@getInfo')
        ->name(RouteConstants::QUESTION_GET_INFO);

    Route::get('/get-description/{publicId}', 'QuestionController@getDescription')
        ->name(RouteConstants::QUESTION_GET_DESCRIPTION);

//    Route::get('/content-of-question/{publicId}', 'QuestionController@getContentOfQuestion')
//        ->name(RouteConstants::QUESTION_GET_DESCRIPTION_OF);

    Route::get('/list', 'QuestionController@getList')
        ->name(RouteConstants::QUESTION_GET_LIST);
});

Route::group([
    'prefix' => 'answer'
    ], function() {
    Route::post('/post', 'AnswerController@postPost')
        ->name(RouteConstants::ANSWER_POST_POST);
    Route::post('/save-during-editing', 'AnswerController@postSaveDuringEditing')
        ->name(RouteConstants::ANSWER_POST_SAVE_DURING_EDITING);
//    Route::get('/content-of-answer/{publicId}', 'AnswerController@getContentOfAnswer')
//        ->name(RouteConstants::ANSWER_GET_DESCRIPTION_OF);
//    Route::get('/list-posted-answers-of-question/{questionPublicId}/{sortedType}', 'AnswerController@getListPostedAnswersOfQuestion')
//        ->name(RouteConstants::ANSWER_GET_LIST_POSTED_ANSWERS_OF);
    Route::get('/get-description/{publicId}', 'AnswerController@getDescription')
        ->name(RouteConstants::ANSWER_GET_DESCRIPTION);
    Route::get('/get-info/{publicId}', 'AnswerController@getInfo')
        ->name(RouteConstants::ANSWER_GET_INFO);
});

Route::group([
    'prefix' => 'comment'
    ], function() {
    Route::post('/post', 'CommentController@postPost')
        ->name(RouteConstants::COMMENT_POST_POST);
//    Route::get('/list-posted-comments-of/{commentableType}/{commentablePublicId}', 'CommentController@getListPostedCommentsOf')
//        ->name(RouteConstants::COMMENT_GET_LIST_POSTED_COMMENTS_OF);
});

Route::group([
    'prefix' => 'tag'
    ], function (){
    Route::get('/get_tags_of_subject/{subjectId}', 'TagController@getTagsOfSubject')
        ->name(RouteConstants::TAG_GET_TAGS_OF_SUBJECT);
});

Route::group([
    'prefix' => 'activity'
    ], function() {
    Route::get('/my-posts', 'ActivityController@getMyPosts')
        ->name(RouteConstants::ACTIVITY_GET_MY_POSTS);
    Route::post('/vote-post', 'ActivityController@postVotePost')
        ->name(RouteConstants::ACTIVITY_POST_VOTE_POST);
    Route::post('/manage-favorite-question', 'ActivityController@postManageFavoriteQuestion')
        ->name(RouteConstants::ACTIVITY_POST_MANAGE_FAVORITE_QUESTION);
    Route::post('/choose-best-answer', 'ActivityController@postChooseBestAnswer')
        ->name(RouteConstants::ACTIVITY_POST_CHOOSE_BEST_ANSWER);
});
