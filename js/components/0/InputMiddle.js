function InputMiddle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 0;

    this.inputPosition = "middle";

    this.padding = 8;
    this.inputLeftWidth = 16;
    this.inputRightWidth = 16;
    this.inputHeight = 31;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}