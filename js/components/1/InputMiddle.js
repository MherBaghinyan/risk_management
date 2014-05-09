function InputMiddle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 1;

    this.inputPosition = "middle";

    this.padding = 15;
    this.inputLeftWidth = 30;
    this.inputRightWidth = 30;
    this.inputHeight = 60;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}