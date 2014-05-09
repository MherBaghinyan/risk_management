function HyvesLoginButton(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 4;

    this.padding = 50;
    this.buttonLeftWidth = 81;
    this.buttonRightWithWithArrow = 170;
    this.buttonHeight = 182;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}