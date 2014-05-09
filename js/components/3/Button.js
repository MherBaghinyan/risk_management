function Button(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 3;

    this.padding = 32;
    this.buttonLeftWidth = 53;
    this.buttonRightWithWithArrow = 99;
    this.buttonHeight = 105;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}



function SmallButton(screenWidth) {
    this.screenWidth = screenWidth;

    this.screenSizeIndex = 3;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 57;
    this.buttonHeight = 83;

    this.getButtonMiddleWidth = screenWidth - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow + 10;
}