function Button(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 4;

    this.padding = 50;
    this.buttonLeftWidth = 81;
    this.buttonRightWithWithArrow = 151;
    this.buttonHeight = 160;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}


function SmallButton(screenWidth) {

    this.screenWidth = screenWidth;

    this.screenSizeIndex = 4;

    this.padding = 32;
    this.buttonLeftWidth = 53;
    this.buttonRightWithWithArrow = 99;
    this.buttonHeight = 105;

    this.getButtonMiddleWidth = screenWidth - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}