/**
 * User: Karen.Gasparyan
 * Date: 5/27/13
 * Time: 8:34 PM
 */

var COUNTRY_CODES = {
    "Other" : "nl-NL",
    "The Netherlands" : "nl-NL",
    "United Kingdom" : "en-GB"
};

var merge = function (set1, set2) {
    for (var key in set2) {
        if (set2.hasOwnProperty(key))
            set1[key] = set2[key]
    }
    return set1;
};

var serializedArrayToObject = function (arr) {
    var obj = {};
    for (var i in arr) {
        obj[arr[i]["name"]] = arr[i]["value"];

    }

    return obj;
};

var getChangedValues = function (obj1, obj2) {
    var obj3 = {};
    for (var i in obj1) {
        if ((i in obj2) && obj1[i] != obj2[i]) {
            if (i == "birthDate") {
                if (moment(new Date(obj1[i])).format("YYYYMMDD") == moment(new Date(obj2[i])).format("YYYYMMDD"))
                    continue
            }
            obj3[i] = obj1[i];
        }
    }
    return obj3;
};

var wrapToObject = function (obj, wrapObj) {
    var newObj = {};
    for (var i in wrapObj) {
        if (!(wrapObj[i] in obj))
            newObj[wrapObj[i]] = "";
        else
            newObj[wrapObj[i]] = obj[wrapObj[i]];
    }
    return newObj;
};

var writeData = function () {
    var args = Array.prototype.slice.call(arguments);

    var key = args[0];
    var value = args[1];

    localStorage[key] = JSON.stringify(value);
};

var getLocalData = function (key) {
    if (localStorage[key] != null)
        return JSON.parse(localStorage[key]);
    return null;
};

var getJsonDataByKey = function (key, jsonKey) {
    if (localStorage[key] != null) {
        var data = JSON.parse(localStorage[key]);
        if (data == null)
            return null;
        return data[jsonKey];
    }
    else
        return null;
}

var updateData = function () {
    var args = Array.prototype.slice.call(arguments);

    var key = args[0];
    var values = args[1];

    var oldValues = JSON.parse(localStorage[key]);

    var newValues = merge(oldValues, values);

    localStorage[key] = JSON.stringify(newValues);
};


var getDataField = function (key, fieldName) {
    if (getLocalData(key))
        return getLocalData(key)[fieldName];
    return null;
};

var deleteData = function () {
    var args = Array.prototype.slice.call(arguments);

    var key = args[0];

    localStorage.removeItem(key);
};

var writeUserData = function (data) {
    writeData("userData", data);
};

var updateUserData = function (data) {
    updateData("userData", data);
};

var deleteUserData = function () {
    deleteData("userData");
};

var getUserData = function () {
    if (getLocalData("userData"))
        return getLocalData("userData");
    return null;
};

var getUserDataField = function (field) {
    if (getLocalData("userData"))
        return getLocalData("userData")[field];
    return null;
};

var updateUserDataField = function (key, value) {
    var obj = {};
    obj[key] = value;
    updateUserData(obj);
};

var writeCardDetails = function (data) {
    writeData("paymentDetails", data);
};

var getRequestSettings = function () {
    return 0;
};

var getToken = function () {
    var userData = getUserData();
    if (userData != null)
        return userData.token;
    return null;
}

function isTopUp() {
    if (getData("fromTopUp") != null)
        return getLocalData("fromTopUp");
    else
        return false;
};


var deleteTopup = function () {
    deleteData("fromTopUp");
    deleteData("topupMoney");
};

//save data in localstorage
function writePlainData(key, value) {
    window.localStorage.setItem(key, value);
}

//get data from localstorage
function getData(key) {
    return window.localStorage.getItem(key);
}


var callService = function (endPoint, sendData, successCallback, errorCallback) {
    if (errorCallback == undefined)
        errorCallback = function () {
        };
    if (successCallback == undefined)
        successCallback = function () {
        };

//    console.log("callservice: "  +endPoint);

    $.ajax({
        type: 'GET',
        url: service_base_url + endPoint,
        dataType: 'json',
        data: sendData,
        crossDomain: true,
        success: successCallback,
        error: errorCallback
    });
};

var callAuthorizedService = function (endPoint, sendData, successCallback, errorCallback) {
    sendData.token = getToken();
    callService(endPoint, sendData, successCallback, errorCallback);
};

var redirectToActivatePhonePage = function () {
    if (document.location.href.split("/")[document.location.href.split("/").length - 1] != "change_phone_number.html")
        $.mobile.changePage("change_phone_number.html");
};

var redirectToActivateEmailPage = function () {
    if (document.location.href.split("/")[document.location.href.split("/").length - 1] != "change_email.html")
        $.mobile.changePage("change_email.html");
};

var checkActivation = function () {
    if (getUserDataField("phoneActivation") != null && !getUserDataField("phoneActivation"))
        redirectToActivatePhonePage();
    if (getUserDataField("emailActivation") != null && !getUserDataField("emailActivation"))
        redirectToActivateEmailPage();

};

var syncAccountWithServer = function () {
    callAuthorizedService('/account/getAccountDetailed', {}, function (response) {
        updateUserData(response.responseText);
        callAuthorizedService("/account/getOtherSettingsNotification", {}, function(response){

            if(response.status == 'success' && getData("otherSettings") != null)
                updateData("otherSettings", response.responseText);
        }, function(error){

        });
    }, function (error) {
        alert("Can't connect to server")
    });
};

var confirmWindow = function (text, callback) {
    var confirmation = confirm(text);

    if (confirmation)
        callback.apply(this, [2]);
    else
        callback.apply(this, [1]);
};


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}


function getURLParameterFromText(name, url) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function moneyFormatter(moneyString) {
    var value = moneyString + '';
    if (value.indexOf(",") > 0)
    {
    value = value.replace(",", ".");
    }
    if(value.indexOf(".") > 0)
    {
        var replacement = ',';
        value = value.replace(/.([^.]*)$/,replacement+'$1');
        return value;
    }

    return moneyString;
}


//setting window.requestAnimationFrame, if exist with prefixes (webkit, moz), if no, use setTimeout
//
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//toggling class with pure javascript (much faster, than jquery)
function toggleClass(element, className){
    if (!element || !className){
        return;
    }

    var classString = element.className;
    if(classString != undefined)
        var nameIndex = classString.indexOf(className);
    else
        return;

    if (nameIndex == -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

function waitAndChange(url, time, showLoading){
    $.mobile.changePage(url);
//    if(showLoading)
//        $(".ui-loader").show();
//
//    $.mobile.loadPage(url, {prefetch:"true"});
//
//    setTimeout(function(){
//        $.mobile.changePage(url);
//    }, time ? time : 200);
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
