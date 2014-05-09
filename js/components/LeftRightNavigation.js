function createLeftRightNavigation(parentElem, leftText, rightText, leftUrl, rightUrl, active) {
    leftUrl = leftUrl != null ? leftUrl : "";
    rightUrl = rightUrl != null ? rightUrl : "";
    var leftIndex = leftUrl.lastIndexOf('/');
    var leftRedirect = leftUrl.substr(leftIndex + 1,leftUrl.length);
    var rightIndex = rightUrl.lastIndexOf('/');
    var rightRedirect = rightUrl.substr(rightIndex + 1,rightUrl.length);

    document.URL.indexOf(leftRedirect);

    parentElem.append("<a class='left_navigator_link' href='" + leftRedirect + "'>" + leftText + "</a>" +
        "<a class='right_navigator_link' href='" + rightRedirect + "'>" + rightText + "</a>");

    if (active === 2) {
        var bgUrl = parentElem.css('backgroundImage');
        bgUrl = bgUrl.replace('left_navigator', 'right_navigator');
        parentElem.css('backgroundImage', bgUrl);
        parentElem.removeClass("leftNavigator");
        parentElem.addClass("rightNavigator");

//        $('.right_navigator_link').css('color', '#000');
//        $('.left_navigator_link').css('color', '#fff');

    }
    else {

        parentElem.removeClass("rightNavigator");
        parentElem.addClass("leftNavigator");
//        $('.left_navigator_link').css('color', '#000');
//        $('.right_navigator_link').css('color', '#fff');

    }
}