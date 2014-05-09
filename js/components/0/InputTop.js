function InputTop(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 0;

    this.inputPosition = "top";

    this.padding = 8;
    this.inputLeftWidth = 16;
    this.inputRightWidth = 16;
    this.inputHeight = 32;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}