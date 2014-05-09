function HyvesLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 0;

    this.padding = 8;
    this.buttonLeftWidth = 16;
    this.buttonRightWithWithArrow = 34;
    this.buttonHeight = 36;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}