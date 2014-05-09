var titleDiv = null;

function addRightMenuPanel($) {
    var rightMenuPanelOpened = false;
    // Credits sub menu

    var creditsSubMenuLinks = [
        {"text": "Top-up credits", "link": "topup_credits.html"},
        {"text": "View credits", "link": "topup_credits.html"}
    ];

    var creditsSubMenuData = new MenuData(creditsSubMenuLinks, "Credits");

    // About me sub menu

    var aboutMeSubMenuLinks = [
        {"text": "How to play", "link": "how_to_play.html"},
        {"text": "Prizes to win", "link": "prizes_to_win.html"},
        {"text": "Terms & Conditions", "link": "terms_and_conditions.html"},
        {"text": "Lottery Gaming Authority", "link": "lottery_gaming_authority.html"},
        {"text": "About Mumber", "link": "about_mumber.html"}
    ];

    var aboutMeSubMenuData = new MenuData(aboutMeSubMenuLinks, "About Mumber");

    // Help sub menu

    // Help FAQ

    var faqSubMenuLinks = [
        {"text": "Question 1", "link": "faq.html"},
        {"text": "Question 2", "link": "faq.html"},
        {"text": "Question 3", "link": "faq.html"},
        {"text": "Question 4", "link": "faq.html"},
        {"text": "Question 5", "link": "faq.html"},
        {"text": "Question 6", "link": "faq.html"}
    ];

    var faqSubMenuData = new MenuData(faqSubMenuLinks, "FAQ");

    // Send message

    var sendMessageMenuData = new MenuData([], "Send us a message");

    // Help customer service

    var csSubMenuLinks = [
        {"text": "Call Mumber", "link": "tel:800-123-4567"},
        {"text": "Send us a message", "sub_menu": sendMessageMenuData}
    ];

    var csSubMenuData = new MenuData(csSubMenuLinks, "Customer Service");

    // Help main sub menu

    var helpSubMenuLinks = [
        {"text": "Frequently Asked Questions", "sub_menu": faqSubMenuData},
        {"text": "Customer Service", "sub_menu": csSubMenuData}
    ];

    var helpSubMenuData = new MenuData(helpSubMenuLinks, "Need some help?");

    // My Mumber sub menu

    var myMumberSubMenuLinks = [
        {"text": "Active tickets", "link": "activate_deactivate_regular_tickets.html"},
        {"text": "Subscription tickets", "link": "ticket_subscription.html"},
        {"text": "Personal settings", "link": "settings.html"},
        {"text": "Play history", "link": "history_page.html"},
        {"text": "Responsible gambling", "link": "responsible_gambling.html"}
    ];

    var myMumberSubMenuData = new MenuData(myMumberSubMenuLinks, "MyMumber");

    // Main menu

    var menuLinks = [];

    var resultUrl = '';

    if (getUserDataField("token") != null) {
        menuLinks.push({"text": "Buy tickets", "link": "buy_regular_tickets.html"});
        menuLinks.push({"text": "Give tickets", "link": "buy_regular_tickets.html?from=give_tickets"});
        menuLinks.push({"text": "Results", "link": "result.html"});
        menuLinks.push({"text": "Credits", "sub_menu": creditsSubMenuData});
    }

    menuLinks.push({"text": "About Mumber", "sub_menu": aboutMeSubMenuData});
    menuLinks.push({"text": "Help", "sub_menu": helpSubMenuData});

    var mainMenuData = new MenuData(menuLinks, "Mumber menu");

    if (getUserDataField("token") != null) {
        menuLinks.push({"text": "MyMumber", "sub_menu": myMumberSubMenuData});
        menuLinks.push({"text": "Log out", callback: logout});
    }

    // Menu connections

    aboutMeSubMenuData.parent = mainMenuData;
    creditsSubMenuData.parent = mainMenuData;
    helpSubMenuData.parent = mainMenuData;
    faqSubMenuData.parent = helpSubMenuData;
    csSubMenuData.parent = helpSubMenuData;
    sendMessageMenuData.parent = csSubMenuData;
    myMumberSubMenuData.parent = mainMenuData;


    $('#rightButtonContainer').on("touchend", function () {


        var leftContent = $("#leftContent").get(0);
        var rightContent = $("#rightContent").get(0);


        toggleClass(leftContent, "right-menu-open");

        if(rightMenuPanelOpened){
            jQuery('body').off("touchmove");

            toggleClass(leftContent, "shadowRightPanel");

            setTimeout(function(){
                    toggleClass(rightContent, "show");
                }, 260);
        }
        else{
            jQuery('body').on('touchmove', function(e) {
                e.preventDefault();
            });
            toggleClass(rightContent, "show");
            setTimeout(function(){
                toggleClass(leftContent, "shadowRightPanel");

            }, 270);
        }

        rightMenuPanelOpened = !rightMenuPanelOpened;

    });

    $('#rightButtonContainer').append("<a><img alt='Panel' src='images/" + folder + "/right_panel.png'/></a>");

    drawMenu(mainMenuData, $);
}

function setTitle(titleDiv, title) {
    if (title == "Credits") {
        callAuthorizedService("/account/getCredits", {"random": new Date().getTime()}, function (responseData) {
            if (responseData.status == 'error') {
                navigator.notification.alert(responseData.errorMessage, function(){}, 'Mumber', 'OK');
            }
            else {
                titleDiv.find('span').html("Credits - <span class='euro_sign'>&euro;</span><span class='money'>" + responseData.responseText + "</span>");
                formatCurrency();
            }

        }, function () {
            navigator.notification.alert('Connection problem', function(){}, 'Mumber', 'OK');
        });
    }
    else {
        titleDiv.find('span').text(title);
    }
}

function drawMenu(menuData, $) {
    var rightContent = $("#rightContent");

    rightContent.empty();
//    if(titleDiv == null)
        titleDiv = jQuery("<div id='right_panel_title'><span></span></div>");
//    else
//        titleDiv.empty();

    if (menuData.parent != null) {
        titleDiv.append($("<div></div>").addClass('right_panel_with_arrow'));

        titleDiv.on("touchend", function (e) {
            drawMenu(menuData.parent, $);
        });
    }

    rightContent.append($(titleDiv));

    setTitle(titleDiv, menuData.title);

    for (var link in menuData.links) {
        var linkElement = jQuery('<a></a>').text(menuData.links[link]["text"]).attr({"rel": link});

        linkElement.addClass('right_panel_links ' + (link == menuData.links.length - 1 ? "right_panel_links_last" : ""));

        linkElement.on("touchend", function (e) {

            if(menuData.links[this.rel]["callback"]){
                menuData.links[this.rel]["callback"]();
                return;
            }
            var link = menuData.links[this.rel]["link"];
            var subMenu = menuData.links[this.rel]["sub_menu"];

            if (subMenu != undefined) {
                drawMenu(subMenu, $);
                return;
            }

            if (link == "logout.html") {
                navigator.notification.confirm(
                    'Are you sure you want to log out of the Mumber App?',
                    function (button)
                    {
                        if (button == 1)
                        {
                            // 1 or 2, is a big question.
                        }
                        else
                        {
                            $.mobile.changePage(link);
                        }
                    },
                    'Mumber',
                    'Cancel, Yes. Log out'
                );
            }
            else if (link == "result.html") {
                callAuthorizedService('/result/checkResults', {}, function (responseData) {
                    var resultUrl = "";

                    if (responseData.responseText.Played) {
                        if (responseData.responseText.Won) {
                            resultUrl = "win_result.html";
                        }
                        else if (responseData.responseText.FreeTicket) {
                            resultUrl = "won_free_ticket.html";
                        }
                        else {
                            resultUrl = "lost_result.html";
                        }
                    }
                    else {
                        resultUrl = "result_not_played_yet.html";
                    }

                    $.mobile.changePage(resultUrl);

                }, function (error) {
                    navigator.notification.alert('Connection problem', function(){}, 'Mumber', 'OK');
                });
            }
            else {
                if(link.indexOf("tel:") != -1)
                    document.location.href = link;
                else
                    $.mobile.changePage(link);
            }
        })

        rightContent.append($(linkElement));
    }

    if (menuData.title == "Send us a message") {
        rightContent.append($('<div id="sendMessageBlock" style="width: 100%"></div>'));

        createInputs($("#sendMessageBlock"),
            [
                {"name": "message", "placeholder": "Type your message or question here...", "type": "textarea"}
            ],
            "send_message_block", "message_form", this.width);

        rightContent.append($('<div id="sendMessageBtn"></div>'));

        createButton($("#sendMessageBtn"), "send_us_message_btn", "Send", "purple", function () {

            callAuthorizedService('/account/sendPersonalMessage', {"message": $("textarea[name=message]").val()}, function (responseData) {
                navigator.notification.alert('Your message has been sent', function(){}, 'Mumber', 'OK');
                drawMenu(menuData.parent, $);

            }, function (error) {
                navigator.notification.alert('Connection problem', function(){}, 'Mumber', 'OK');
            });
        });

        calculateButtonComponent($(document).width() * 0.7, 'send_us_message_btn', 'purple');
    }
}

function MenuData(links, title) {
    this.links = links;
    this.title = title;
    this.parent = null;
}