function InputSingle(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 4;

    this.inputPosition = "single";

    this.padding = 50;
    this.inputLeftWidth = 80;
    this.inputRightWidth = 80;
    this.inputHeight = 167;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}