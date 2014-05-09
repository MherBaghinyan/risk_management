function addOkButton(callbackFunction, $) {
    $('#rightButtonContainer').append("<a><img alt='Ok' src='images/" + folder + "/ok_btn.png'/></a>");

    $('#rightButtonContainer').on("click", callbackFunction);
}