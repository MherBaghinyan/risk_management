var folder = 4;

var isLocal = false;
var isIphone = false;
var isDebug = false;
var isInitialized = false;
var loadedJsFiles = new Array();
var pageShowed = false;

var screenWidth = screen.width;
var screenHeight = screen.height + 1;
var FastClick;

var pageChanging = false;
var url;
var lastPageChange = 0;
var lastPageShown = "";
var pageExist = 0;

var notificationShowed = false;


if(isIphone){
    screenWidth = screen.width * 2;
    screenHeight = screen.height * 2;
}

function addToLoadedJsFiles(fileName, loadFile){
    if($.inArray(fileName, loadedJsFiles) == -1) {
        loadedJsFiles.push(fileName);
        if(loadFile && fileName != "")
            $.getScript('scripts/' + fileName + ".js", function() {
                if(typeof window[fileName] === 'function') {
                    window[fileName]();
                }
            });
    } else {
        if((fileName != '' && fileName != 'index')) {
            if(typeof window[fileName] === 'function') {
                window[fileName]();
            }
        }
    }
}

$(document).on("pageshow", function(event, ui){
    $(".ui-loader").hide();

    if(FastClick)
        FastClick.attach(document.body);

    if(event.target !== $("#settingsPage").get(0)) {

        pageShowed = false;
        setTimeout(function(){
            removePageFromDom("#settingsPage");
        }, 200);
    }

});

$(document).on("pagebeforeshow", function(event, ui){

    var leftContent = $("#leftContent", event.target);
    if(leftContent.hasClass("right-menu-open"))
        $('#rightButtonContainer', event.target).trigger("touchend")

    if(event.target === $("#settingsPage").get(0) || event.target === $('#giftStatusesPage').get(0) || event.target === $("#registrationPage").get(0)) {
        $('body').off('touchmove');
    } else {
        $('body').off('touchmove').on('touchmove', function(e){
            e.preventDefault();
        });
    }

})


$(document).on("pageload", function(event, toPage, options){
    var fileName = $.mobile.path.parseUrl(toPage.absUrl).filename;
    addToLoadedJsFiles(fileName.split(".")[0], true);
});


$(document).on("pagebeforechange", function(event, toPage){
    if (typeof toPage.toPage !== 'string') {
        if(toPage.options.fromPage && toPage.options.fromPage.get(0) === toPage.toPage.get(0))
            event.preventDefault();
        return -1;
    }

    pageExist = pageExistsInDom(toPage);
    if(pageExist === 0){
        console.log(event.timeStamp - lastPageChange);
        if(event.timeStamp - lastPageChange <= 1300/* && event.delegateTarget.URL === lastPageShown*/){
            event.preventDefault();
        }

        lastPageChange = event.timeStamp;
        lastPageShown = event.delegateTarget.URL;

        event.preventDefault();

        $(".ui-loader").show();

        url = toPage.toPage;

        $.mobile.loadPage(url, {prefetch:"true"});


    }
});

$(document).on("pagechange", function(event, data){
    console.log(data);
    removePageFromDom(data.options.fromPage);
});

function removePageFromDom(pageId){
    $(pageId).remove();
}


function removeFromDomExcept(pages){
    var existingPages = $(".ui-page");

    for(var i = 0, len = existingPages.length; i < len; i++){
        if(jQuery.inArray(existingPages.eq(i).attr("id"), pages) === -1){
            existingPages.eq(i).remove();
        }
    }
}

function pageExistsInDom(toPage){
    var pages = $(".ui-page");

    if (typeof toPage.toPage !== 'string') {
        return -1;
    }
    for(var i = 0, len = pages.length; i < len; i++){
//        console.log(toPage.absUrl);
//        console.log(pages.eq(i).attr("data-url"));
        if(pages.eq(i).attr("data-url") != "/" && toPage.absUrl.indexOf(pages.eq(i).attr("data-url")) !== -1){
            return 1;
        }
    }
    return 0;
}



function pageExistsInDomString(toPage){
    var pages = $(".ui-page");
    for(var i = 0, len = pages.length; i < len; i++){
//        console.log(toPage.absUrl);
//        console.log(pages.eq(i).attr("data-url"));
        if(pages.eq(i).attr("data-url") != "/" && toPage.indexOf(pages.eq(i).attr("data-url")) !== -1){
            return 1;
        }
    }
    return 0;
}

$(document).on("pagebeforeload", function(event, data){
//    var pageExist = pageExistsInDomString(data.absUrl);
//    if(pageExist === 1)
//        event.preventDefault();

});

$(document).on("pagebeforecreate", function (event)
{
    if(!isInitialized){

        if(!isLocal){
            var timer = window.setInterval(function () {
                if (window.device) {
                    window.clearInterval(timer);
                    successResume();
                };
            }, 100);
        }

        window.onerror = function (e)
        {
        };

        if(isDebug){
            $.getScript("http://192.168.0.95:8989/target/target-script-min.js#anonymous", function(){

            });
        }

        // adding common components
        if(isIphone)
        {
            $('head').append($('<meta/>').attr('name', 'viewport').attr('content', 'user-scalable=yes, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, width=device-width, height=device-height, target-densitydpi=device-dpi'));
        }
        else if(!isLocal)
        {
            $('head').append($('<meta/>').attr('name', 'viewport').attr('content', 'user-scalable=yes, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi'));
            $.getScript("statusbarnotification.js");
        }

        $('head').append($('<meta/>').attr('http-equiv', 'Content-Type').attr('content', 'text/html').attr('charset', 'utf-8'));
        $('head').append($('<link rel="stylesheet" type="text/css"/>').attr('href', 'css/style.css'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/util.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/mobile_version.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/moment.min.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/fastdom.js'));


        $.getScript('js/fastclick.js', function(){
            FastClick.attach(document.body);
        });

        if(!isIphone && !isLocal)
        {
            $.getScript('js/cordova-2.9.0.js');
        }
        else if(isIphone)
        {
            $('head').append($('<script type="text/javascript" />').attr('src', 'phonegap.js'));
        }

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/jquery.maskedinput.js'));

        if(isLocal)
        {
            $.getScript('http://connect.facebook.net/en_US/all.js', function(){
                FB.init({
                    appId      : '383359088442699',                    // App ID from the app dashboard
                    status     : true,                                 // Check Facebook Login status
                    xfbml      : true                                  // Look for social plugins on the page
                });
            });
        }
        else
        {
            $.getScript('cdv-plugin-fb-connect.js', function(){
                $.getScript('facebook_js_sdk.js', function(){
                    FB.init({ appId: "383359088442699", nativeInterface: CDV.FB, useCachedDialogs: false });
                });
            });

        }

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/fittext.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/texts.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/helpers.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/Button.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/FacebookLoginButton.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/HyvesLoginButton.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/Inputs.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/RightMenu.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/OkButton.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/LeftRightNavigation.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/Rollers.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/ExpireDateRoller.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/DateTimeRoller.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/JackpotCounter.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/DrawCounter.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/ButtonsBlock.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/GiftStatusesList.js'));

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/HistoryRoller.js'));

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/BottomNavigator.js'));

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/checkbox/jquery.metadata.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/jquery.formatCurrency-1.4.0.pack.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/jquery.formatCurrency-1.4.0.pack.js'));

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/i18n/currency/jquery.formatCurrency.en-GB.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/i18n/currency/jquery.formatCurrency.nl-NL.js'));

        $('head').append($('<script type="text/javascript" charset="utf-8" />').attr('src', 'js/PushNotification.js'));

        $('head').append($('<link rel="stylesheet" type="text/css"/>').attr('href', 'roller/css/mobiscroll.core.css'));
        $('head').append($('<link rel="stylesheet" type="text/css"/>').attr('href', 'roller/css/mobiscroll.animation.css'));
        $('head').append($('<link rel="stylesheet" type="text/css"/>').attr('href', 'roller/css/mobiscroll.ios.css'));
        $('head').append($('<link rel="stylesheet" type="text/css"/>').attr('href', 'roller/css/mobiscroll.ios7.css'));


        $('head').append($('<script type="text/javascript" />').attr('src', 'roller/js/mobiscroll.core.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'roller/js/mobiscroll.datetime.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'roller/js/mobiscroll.select.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'roller/js/mobiscroll.ios.js'));
        $('head').append($('<script type="text/javascript" />').attr('src', 'roller/js/mobiscroll.list.js'));



        document.addEventListener("offline", onOffline, false);


        // Handle the offline event
        function onOffline()
        {
//            if ($("div[nointernet=true]").size() == 0)
//            {
//                $.mobile.changePage("no_internet.html");
//            }
        }




        var windowWidth = 1024;
        var windowHeight = 1920;

        var resolutions =
            [
                //        {"width" : 320, "height" : 480, "folder" : 0},
                {"width": 480, "height": 800, "folder": 1},
                {"width": 640, "height": 960, "folder": 2},
                {"width": 768, "height": 1024, "folder": 3},
                {"width": 1200, "height": 1920, "folder": 4}
            ];

        if(isLocal)
            window.innerWidth = screen.width;


        //    if(getData("screenFolder") == null){
        for (var i = 0; i < resolutions.length; i++)
        {
            if (window.innerWidth <= resolutions[i].width)
            {
                windowWidth = resolutions[i].width;
                windowHeight = resolutions[i].height;
                folder = resolutions[i].folder;
                break;
            }
        }
        writePlainData("screenFolder", folder);

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/Button.js"));


        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/MumberCheckbox.js'));

        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/FacebookLoginButton.js"));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/HyvesLoginButton.js"));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/InputTop.js"));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/InputMiddle.js"));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/InputBottom.js"));
        $('head').append($('<script type="text/javascript" />').attr('src', 'js/components/' + folder + "/InputSingle.js"));
        $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'css/' + folder + "/style.css"));


        if (isLocal)
        {
            if(navigator.notification == undefined)
                navigator.notification = {};


            navigator.notification.confirm = confirmWindow;

            navigator.notification.alert = function (text)
            {
                alert(text);
            };
        }

        var fileName = $.mobile.path.parseUrl(event.currentTarget.URL).filename;
        addToLoadedJsFiles(fileName.split(".")[0], false);

    }

    isInitialized = true;
});

var headers1Sizes = [100, 200, 300, 400];
var headers2Sizes = [130, 300, 400, 500];
var headers3Sizes = [200, 400, 600, 800];
var headersSizes = [headers1Sizes, headers2Sizes, headers3Sizes];

var bottomHeightSizes = [40, 75, 100, 130, 200];

var checkboxWidthSizes = [0, 0, 0, 0, 200];

function setButonsPressedState(){
    var buttons = ["#my_mumber_footer_buttons > div > a", ".login_btn_div", ".send_us_message_btn", ".fb_login_btn",
        ".recived_tick_btn", ".activate_code_btn_div", ".back_btn_block", ".right_button_container > a > img", "#restartAppButtonContainer", "#regButtonContainer",
        ".fg_pass_btn_div", "#agreeAndContinue", "#getNewPasswordButtonContainer", "#seeFriendButtonContainer",
        "#makeHappyButtonContainer", "#buyTicketButtonContainer", "#sendMessageBtn", "#smallblackBtnMid", "#saveButtonContainer", "#removeButtonContainer"];

    for(var button in buttons){
        $(buttons[button]).bind('touchstart', function(){
            $(this).css("opacity", "0.5");
        }).bind('touchend', function(){
                $(this).css("opacity", "1");
            }).bind('mouseout', function(){
                $(this).css("opacity", "1");
            });
    }
}


function styleCheckboxes($)
{


    $("select").on('vclick', function(e){e.preventDefault()});
    $(':checkbox').mumberCheckbox();
//    $("body").show();


//    if ($("div[authorize=false]").size() == 0)
//    {
//        if (getData("lastActivity"))
//        {
//            if (!moment(getData("lastActivity")).add("minutes", 15).isAfter(moment()) && !getJsonDataByKey("otherSettings", "rememberPassword"))
//            {
//                $.mobile.changePage("session_expired.html");
//            }
//        }
//
//        writePlainData("lastActivity", moment().format());
//
//        if (getToken())
//        {
//            if (!getUserDataField("emailActivation") && !getUserDataField("phoneNumberActivation"))
//            {
//                $.mobile.changePage("account_activation.html");
//            }
//            else if (!getUserDataField("emailActivation"))
//            {
//                $.mobile.changePage("change_email.html");
//            }
//            else if (!getUserDataField("phoneNumberActivation"))
//            {
//                $.mobile.changePage("change_phone_number.html");
//            }
//        }
//        else
//        {
//            $.mobile.changePage("login.html");
//        }
//    }
//    else
//    {
//        deleteData("lastActivity");
//    }

    correctHeight($);

//    $("#leftContent").fadeIn(500, function(){
////        $("#rightContent").show();
//        jQuery(".ui-loader").hide();
//
//    });

    setButonsPressedState();

}

function correctHeight($, height)
{


    $("#mumberLogo").attr("src", 'images/' + folder + '/logo.png').unbind("click").click(function(){

        if(isAuthorized())
            jQuery.mobile.changePage("my_mumber.html");
        else
            jQuery.mobile.changePage("login.html");
    });




    for (var i = 1; i <= 3; i++)
    {
        var headerHeightIndex = folder - 1;
        var headerHeight = headersSizes[i - 1][headerHeightIndex];

        if ($('.header_block' + i).get(0))
        {
//            if(height != undefined)
            $('.header_block' + i).attr('src', 'images/' + folder + '/bg' + (Math.floor(Math.random() * 4) + 1) + '.jpg');

            if ($('.content_gray_block' + i).get(0)) {
                var grey_header;
                var doc_height;
                fastdom.read(function(){

                    doc_height = height == undefined ? $(document).height() : height;

                    grey_header = $(".content_grey_header").height();
                });

                fastdom.write(function(){
                    $(".content_grey_header").css("padding-top", parseInt(grey_header ? grey_header : 0));
                    $('.content_gray_block' + i).height(doc_height - headerHeight - (grey_header ? grey_header : 0));
//                    $('.content_gray_block' + i).css('top', headerHeight + (grey_header ? grey_header : 0));
                    $('.content_gray_block' + i).attr('src', 'images/' + folder + '/content_gray_bg.png');
                    $('.content').height(doc_height - headerHeight);

                });
            }
            else {
                var doc_height;
                fastdom.read(function(){
                    doc_height = height == undefined ? $(document).height() : height;
                });

                fastdom.write(function(){
//                    $('.content_block' + i).height(doc_height - headerHeight);
//                    setTimeout(function(){
                    $('.content_block' + i).height(doc_height - headerHeight);
                    $('.content').height(doc_height - headerHeight);

//                    }, 300);
                    $('.content_block' + i).attr('src', 'images/' + folder + '/content_bg.jpg');

                })

            }

            break;
        }
    }

    var contentMinHeight = $(document).height() - headerHeight - bottomHeightSizes[parseInt(folder)];

    if (contentMinHeight > $('.content').height())
    {
        $('.content').height(contentMinHeight);
    }

    $('.header').height(headerHeight);
    formatCurrency();
    if(pageExist === 0){
        setTimeout(function(){
            $.mobile.changePage(url);
        }, 500);
        pageChanging = false;
    }

}

function logout(){
    navigator.notification.confirm
    (
        'Are you sure?',
        function (button)
        {
            if (button == 1)
            {
                return;
            }
            else
            {
                if(getLocalData("regularTickets") != null)
                {
                    deleteData("regularTickets");
                }
                if(getLocalData("jackpotTickets") != null)
                {
                    deleteData("jackpotTickets");
                }

                deleteUserData();

                if(getData("facebookData") != null){
                    FB.logout(function(response) {
                        deleteData("facebookData");
                        $.mobile.changePage("login.html");
                    });
                } else {
                    $.mobile.changePage("login.html");
                }
            }
        },
        'Mumber',
        'No. Continue, Yes please!'
    );

}

function formatCurrency()
{
    $(".money").formatCurrency({region: getUserData() ? COUNTRY_CODES[getUserDataField("country")] : "nl-NL" });
}


function onNotificationGCM(e) {

    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
//                alert(e.regid);


                callService("/notification/addNewRegId", {
                    "platform" : "ANDROID",
                    "regId" : e.regid
                }, function(response){
                    writePlainData("regId", e.regid);
                }, function(error){console.log(error)});
            }
            break;

        case 'message':

            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                navigator.notification.confirm("You won a prize with Mumber! Would you like to see what you've won?",
                    function (button) {
                        if (button == 1) {

                        }
                        else {
                            $.mobile.changePage("win_result.html");
                        }
                    },
                    'Mumber',
                    'No thanks, Yes sure!'
                );
            }
            else
            {   // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart){
                    navigator.notification.confirm("You won a prize with Mumber! Would you like to see what you've won?",
                        function (button) {
                            if (button == 1) {

                            }
                            else {
                                $.mobile.changePage("win_result.html");
                            }
                        },
                        'Mumber',
                        'No thanks, Yes sure!'
                    );
                }
                else{
                    navigator.notification.confirm("You won a prize with Mumber! Would you like to see what you've won?",
                        function (button) {
                            if (button == 1) {

                            }
                            else {
                                $.mobile.changePage("win_result.html");
                            }
                        },
                        'Mumber',
                        'No thanks, Yes sure!'
                    );
                }

            }


            break;

        case 'error':
            break;

        default:

            break;
    }
}

function eraseInputData(){
    $("input").each(function() {
        if(!$(this).prop("disabled"))
            $(this).val('');
//        else
//            console.log(this);
    });
}
