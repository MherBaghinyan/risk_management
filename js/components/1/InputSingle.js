function InputSingle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 1;

    this.inputPosition = "single";

    this.padding = 15;
    this.inputLeftWidth = 30;
    this.inputRightWidth = 30;
    this.inputHeight = 64;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}