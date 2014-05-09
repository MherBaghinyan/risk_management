function Button(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 0;

    this.padding = 8;
    this.buttonLeftWidth = 16;
    this.buttonRightWithWithArrow = 30;
    this.buttonHeight = 32;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}