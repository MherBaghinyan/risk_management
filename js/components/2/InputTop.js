function InputTop(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 2;

    this.inputPosition = "top";

    this.padding = 20;
    this.inputLeftWidth = 40;
    this.inputRightWidth = 40;
    this.inputHeight = 82;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}