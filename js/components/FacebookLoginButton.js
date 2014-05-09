function calculateFacebookButtonComponent(screenWidth) {
    var fbButton = new FacebookLoginButton(screenWidth);

    $(".fb_login_btn").children(".fb_btn_left").css("width", fbButton.buttonLeftWidth).css("height", fbButton.buttonHeight);
    $(".fb_login_btn").children(".fb_btn_mid").css("width", fbButton.getButtonMiddleWidth).css("height", fbButton.buttonHeight);
    $(".fb_login_btn").children(".fb_btn_right").css("width", fbButton.buttonRightWithWithArrow).css("height", fbButton.buttonHeight);
    $(".fb_login_btn").css("padding-left", "" + fbButton.padding + "px");

    $(".fb_login_btn").find('#fbBtnLeft').attr('src', "images/" + fbButton.screenSizeIndex + "/fb_btn_left.png");
    $(".fb_login_btn").find('#fbBtnMid').css('background', 'url(' + "images/" + fbButton.screenSizeIndex + "/fb_btn_mid.png" + ')');
    $(".fb_login_btn").find('#fbBtnRight').attr('src', "images/" + fbButton.screenSizeIndex + "/fb_btn_right.png");
}