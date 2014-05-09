function Button(screenWidth) {
    this.screenWidth = screenWidth;

    this.screenSizeIndex = 2;

    this.padding = 20;
    this.buttonLeftWidth = 41;
    this.buttonRightWithWithArrow = 76;
    this.buttonHeight = 81;

    this.getButtonMiddleWidth = screenWidth - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}

function SmallButton(screenWidth) {

    this.screenWidth = screenWidth;

    this.screenSizeIndex = 2;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 57;
    this.buttonHeight = 61;

    this.getButtonMiddleWidth = screenWidth - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow + 10;
}