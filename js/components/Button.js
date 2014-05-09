function calculateButtonComponent(screenWidth, buttonClass, buttonColor) {
    if(buttonColor == 'smallblack')
        var button = new SmallButton(screenWidth);
    else
        var button = new Button(screenWidth);


//    if (document.location.href.indexOf('my_mumber.html') != -1) {
//        button.screenSizeIndex++;
//    }

    $("." + buttonClass).children("." + buttonColor + "_btn_left").css("width", button.buttonLeftWidth).css("height", button.buttonHeight);
    $("." + buttonClass).children("." + buttonColor + "_btn_mid").css("width", button.getButtonMiddleWidth).css("height", button.buttonHeight);
    $("." + buttonClass).children("." + buttonColor + "_btn_right").css("width", button.buttonRightWithWithArrow).css("height", button.buttonHeight);
    $("." + buttonClass).css("padding-left", "" + button.padding + "px");

    $("." + buttonClass).find('#' + buttonColor + 'BtnLeft').attr('src', "images/" + button.screenSizeIndex + "/" + buttonColor + "_btn_left.png");
    $("." + buttonClass).find('#' + buttonColor + 'BtnMid').css('background', 'url(' + "images/" + button.screenSizeIndex + "/" + buttonColor + "_btn_mid.png" + ')');
    $("." + buttonClass).find('#' + buttonColor + 'BtnRight').attr('src', "images/" + button.screenSizeIndex + "/" + buttonColor + "_btn_right.png");

}

function createButton(parentElem, buttonClass, buttonText, buttonColor, callbackFunction) {
    var anchor = $("<a></a>").addClass(buttonClass).append(
            $("<span></span>").addClass(buttonColor + "_btn_left").append($("<img />").attr("id", buttonColor + "BtnLeft"))
        ).append(
            $("<span></span>").addClass(buttonColor + "_btn_mid").attr("id", buttonColor + "BtnMid").text(buttonText)
        ).append(
            $("<span></span>").addClass(buttonColor + "_btn_right").append($("<img />").attr("id", buttonColor + "BtnRight"))
        ).click(callbackFunction);
//    $('#' + parentElemId).append(
//        "    <a class='" + buttonClass + "' onclick='" + callbackFunction + "()'>" +
//            "        <span class='" + buttonColor + "_btn_left'><img id='" + buttonColor + "BtnLeft'/></span>" +
//            "        <span class='" + buttonColor + "_btn_mid' id='" + buttonColor + "BtnMid'>" + buttonText + "</span>" +
//            "        <span class='" + buttonColor + "_btn_right'><img id='" + buttonColor + "BtnRight'/></span>" +
//            "    </a>");
//    console.log(anchor);
    if(typeof(parentElem) == 'string')
        $("#" + parentElem).append($(anchor));
    else
        parentElem.append($(anchor));

}

function createBackButton(parentElem, callbackFunction, isCancel, pageId) {


    var button = $("<a></a>").addClass("back_btn_block").append(
        $("<img />").attr({
            'alt' : 'Back',
            'src' : 'images/' + folder + (isCancel ? '/cancel_btn.png' : '/back_button.png')
        })
    );



    $(button).on("click", function(e){
        if(callbackFunction == undefined && typeof callbackFunction != "function"){
            if($("#" + pageId).attr("prev-page")){
                console.log($("#" + pageId).attr("prev-page") );
                $.mobile.changePage($("#" + pageId).attr("prev-page") + ".html");
            } else
                window.history.back();

        }
        else
            callbackFunction();
    });
    parentElem.append(
        button);
}

function createBackButtonWithOutClick(parentElemId) {
    $('#' + parentElemId).append(
        "   <a class='back_btn_block' > " +
            "<img alt='Back' src='images/" + folder + "/back_button.png' /></a>");
}
