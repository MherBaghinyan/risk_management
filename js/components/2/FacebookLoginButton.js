function FacebookLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 2;

    this.padding = 20;
    this.buttonLeftWidth = 41;
    this.buttonRightWithWithArrow = 85;
    this.buttonHeight = 85;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}