//var service_base_url = 'http://localhost:9898/api/api';
var service_base_url = 'http://mumber.am/api/api';
//var service_base_url = 'http://172.26.125.22:9898/api';
//var service_base_url = 'http://192.168.1.57:9898/api';
//var service_base_url = 'http://192.168.137.7:9898/api';
//var service_base_url = 'http://192.168.0.90:9898/api';

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function delCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//check if user is authorized
function isAuthorized() {
    return (getToken() != null && getUserDataField("emailActivation") && getUserDataField("phoneNumberActivation"));
}

//save current page
function saveCurrentPage() {
    var page = document.location.href;
    var fileNameIndex = page.lastIndexOf("/") + 1;
    var filename = page.substr(fileNameIndex);
    writePlainData("lastPage", filename);
}

var mouseEventTypes =
{
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
};

for (originalType in mouseEventTypes) {
    document.addEventListener(originalType, function (originalEvent) {
        event = document.createEvent("MouseEvents");
        touch = originalEvent.changedTouches[0];
        event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
            window, 0, touch.screenX, touch.screenY, touch.clientX,
            touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
            touch.metaKey, 0, null);
        originalEvent.target.dispatchEvent(event);
    });
}