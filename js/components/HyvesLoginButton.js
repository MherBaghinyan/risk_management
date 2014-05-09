function calculateHyvesLoginButtonComponent(screenWidth) {
    var hyvesLoginButton = new HyvesLoginButton(screenWidth);

    $(".hyves_login_btn").children(".hyves_btn_left").css("width", hyvesLoginButton.buttonLeftWidth).css("height", hyvesLoginButton.buttonHeight);
    $(".hyves_login_btn").children(".hyves_btn_mid").css("width", hyvesLoginButton.getButtonMiddleWidth).css("height", hyvesLoginButton.buttonHeight);
    $(".hyves_login_btn").children(".hyves_btn_right").css("width", hyvesLoginButton.buttonRightWithWithArrow).css("height", hyvesLoginButton.buttonHeight);
    $(".hyves_login_btn").css("padding-left", "" + hyvesLoginButton.padding + "px");

    $(".hyves_login_btn").find('#hyvesBtnLeft').attr('src', "images/" + hyvesLoginButton.screenSizeIndex + "/hyves_btn_left.png");
    $(".hyves_login_btn").find('#hyvesBtnMid').css('background', 'url(' + "images/" + hyvesLoginButton.screenSizeIndex + "/hyves_btn_mid.png" + ')');
    $(".hyves_login_btn").find('#hyvesBtnRight').attr('src', "images/" + hyvesLoginButton.screenSizeIndex + "/hyves_btn_right.png");
}