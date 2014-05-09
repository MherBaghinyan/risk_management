function HyvesLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 1;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 64;
    this.buttonHeight = 68;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}