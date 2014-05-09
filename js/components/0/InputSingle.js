function InputSingle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 0;

    this.inputPosition = "single";

    this.padding = 8;
    this.inputLeftWidth = 16;
    this.inputRightWidth = 16;
    this.inputHeight = 33;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}