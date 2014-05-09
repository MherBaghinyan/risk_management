function FacebookLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 1;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 63;
    this.buttonHeight = 63;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}