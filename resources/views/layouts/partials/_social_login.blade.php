<hr class="greenLine"/>
<div class="textAlignCenter">
    {{ __('Or continue signing with') }}
</div>
<br />
<div class="socialLoginButtons">
    <button class="btnGoogle btnSocialLogin btnWithToolTip"
            data-content="Google"
            data-position="top center"
            data-variation="mini"
            data-url="{{ route(\App\Lib\RouteConstants::SOCIAL_AUTH_GET_REDIRECT, ['google']) }}">
        <i class="fab fa-google"></i>
    </button>
    <button class="btnFacebook btnSocialLogin btnWithToolTip"
            data-content="Facebook"
            data-position="top center"
            data-variation="mini"
            data-url="{{ route(\App\Lib\RouteConstants::SOCIAL_AUTH_GET_REDIRECT, ['facebook']) }}">
        <i class="fab fa-facebook-f"></i>
    </button>
    <button class="btnTwitter btnSocialLogin btnWithToolTip"
            data-content="Twitter"
            data-position="top center"
            data-variation="mini"
            data-url="{{ route(\App\Lib\RouteConstants::SOCIAL_AUTH_GET_REDIRECT, ['twitter']) }}">
        <i class="fab fa-twitter"></i>
    </button>
</div>
