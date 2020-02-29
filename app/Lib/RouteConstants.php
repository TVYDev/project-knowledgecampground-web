<?php
/**
 * Created by PhpStorm.
 * User: vannyou.tan
 * Date: 04-Apr-19
 * Time: 5:41 AM
 */

namespace App\Lib;


class RouteConstants
{
    const HOME = 'home';
    const LOCALIZATION = 'localization';

    const PLACEHOLDER = 'PLACEHOLDER';
    /************************************************************
     * Route for UserController
     ***********************************************************/
    const USER_GET_LOGIN = 'user.getLogin';
    const USER_POST_LOGIN = 'user.postLogin';
    const USER_GET_LOGOUT = 'user.getLogout';
    const USER_POST_REGISTER = 'user.postRegister';
    const USER_GET_CHANGE_PASSWORD = 'user.getChangePassword';
    const USER_POST_CHANGE_PASSWORD = 'user.postChangePassword';
    const USER_GET_VIEW_USER_PROFILE = 'user.getViewUserProfile';
    const USER_GET_EDIT_USER_PROFILE = 'user.getEditUserProfile';
    const USER_POST_EDIT_USER_PROFILE = 'user.postEditUserProfile';
    /***********************************************************/

    /************************************************************
     * Route for SocialAuthController
     ***********************************************************/
    const SOCIAL_AUTH_GET_REDIRECT = 'socialAuth.getRedirect';
    /***********************************************************/

    /************************************************************
     * Route for QuestionController
     ***********************************************************/
    const QUESTION_GET_POST  = 'question.getPost';
    const QUESTION_POST_POST = 'question.postPost';
    const QUESTION_POST_SAVE_DURING_EDITING = 'question.postSaveDuringEditing';
    const QUESTION_GET_VIEW = 'question.getView';
    const QUESTION_GET_INFO = 'question.getInfo';
    const QUESTION_GET_DESCRIPTION_OF = 'question.getDescriptionOf';
    const QUESTION_GET_LIST = 'question.getList';
    /***********************************************************/

    /************************************************************
     * Route for AnswerController
     ***********************************************************/
    const ANSWER_POST_POST = 'answer.postPost';
    const ANSWER_POST_SAVE_DURING_EDITING = 'answer.postSaveDuringEditing';
    const ANSWER_GET_DESCRIPTION_OF = 'answer.getDescriptionOf';
    const ANSWER_GET_LIST_POSTED_ANSWERS_OF = 'answer.getListPostedAnswersOf';
    const ANSWER_GET_INFO = 'answer.getInfo';
    /***********************************************************/

    /************************************************************
     * Route for TagController
     ***********************************************************/
    const TAG_GET_TAGS_OF_SUBJECT  = 'tag.getTagsOfSubject';
    /***********************************************************/

    /************************************************************
     * Route for CommentController
     ***********************************************************/
    const COMMENT_POST_POST  = 'comment.postPost';
    const COMMENT_GET_LIST_POSTED_COMMENTS_OF = 'comment.getListPostedCommentsOf';
    /***********************************************************/
}
