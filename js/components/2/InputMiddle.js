function InputMiddle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 2;

    this.inputPosition = "middle";

    this.padding = 20;
    this.inputLeftWidth = 40;
    this.inputRightWidth = 40;
    this.inputHeight = 79;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}