function FacebookLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 3;

    this.padding = 32;
    this.buttonLeftWidth = 53;
    this.buttonRightWithWithArrow = 110;
    this.buttonHeight = 110;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}