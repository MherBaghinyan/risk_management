function InputMiddle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 3;

    this.inputPosition = "middle";

    this.padding = 32;
    this.inputLeftWidth = 52;
    this.inputRightWidth = 52;
    this.inputHeight = 102;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}