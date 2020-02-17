<hr class="greenLine"/>
<div class="textAlignCenter">
    {{ __('Or continue signing with') }}
</div>
<br />
<div class="socialLoginButtons">
    <button class="btnGoogle btnSocialLogin btnWithToolTip" data-content="Google" data-position="top center" data-variation="mini" data-url="{{ route(\App\Lib\RouteConstants::GOOGLE_AUTH_GET_REDIRECT) }}">
        <i class="fab fa-google"></i>
    </button>
    <button class="btnFacebook btnSocialLogin btnWithToolTip" data-content="Facebook" data-position="top center" data-variation="mini">
        <i class="fab fa-facebook-f"></i>
    </button>
    <button class="btnTwitter btnSocialLogin btnWithToolTip" data-content="Twitter" data-position="top center" data-variation="mini">
        <i class="fab fa-twitter"></i>
    </button>
</div>
