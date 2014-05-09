function Button(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 1;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 57;
    this.buttonHeight = 61;

    this.getButtonMiddleWidth = screenWith - 2 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow;
}

function SmallButton(screenWidth) {

    this.screenWidth = screenWidth;

    this.screenSizeIndex = 1;

    this.padding = 15;
    this.buttonLeftWidth = 31;
    this.buttonRightWithWithArrow = 57;
    this.buttonHeight = 61;

    this.getButtonMiddleWidth = screenWidth - 1 * this.padding - this.buttonLeftWidth - this.buttonRightWithWithArrow + 10;
}