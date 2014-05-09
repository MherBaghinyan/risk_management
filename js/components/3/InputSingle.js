function InputSingle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 3;

    this.inputPosition = "single";

    this.padding = 32;
    this.inputLeftWidth = 52;
    this.inputRightWidth = 52;
    this.inputHeight = 109;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}