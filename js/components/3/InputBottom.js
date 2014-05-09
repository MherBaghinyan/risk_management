function InputBottom(screenWith) {
    this.screenWidth = screenWith;

    this.screenSizeIndex = 3;

    this.inputPosition = "bottom";

    this.padding = 32;
    this.inputLeftWidth = 52;
    this.inputRightWidth = 52;
    this.inputHeight = 106;

    this.getInputMiddleWidth = screenWith - 2 * this.padding - this.inputLeftWidth - this.inputRightWidth;
}