function createGiftStatusesList(parentElement, data, type, $) {
    var ulElement = $("<ul></ul>");

    var count = 0;

    for (var row in data)
    {
        var liElement = $("<li></li>");

        var status = "";

        var gift = data[row];

        if (gift["giftStatus"].toUpperCase() == "PENDING" || (type == "five_tickets" && gift["giftStatus"].toUpperCase() == "FRIEND_GIFT_PENDING")) {
            if (moment(gift["modifiedDate"], "YYYY-MM-DD").add('days', 3).isAfter(new Date()))
                status = "status_not_active";
            else
                status = "status_not_active_remind";
        }
        else {
            if (type == 'five_tickets' || gift["gameType"] == "mumber") {
                if (moment(gift["drawDate"], "YYYY-MM-DD").isAfter(new Date()) || gift["gameStatus"].toUpperCase() == "PENDING") {
                    status = "status_play";
                } else {
                    if (gift["wonMoney"] != null && parseInt(gift["wonMoney"]) > 0) {
                        status = "status_won";
                    } else {
                        status = "status_lost";
                    }
                }
            } else {
                if (gift["drawDate"] == null || gift["gameStatus"].toUpperCase() == "PENDING") {
                    status = "status_play";
                } else {
                    if (gift["wonMoney"] != null && parseInt(gift["wonMoney"]) > 0) {
                        status = "status_won";
                    } else {
                        status = "status_lost";
                    }
                }
            }
        }

        var statusText = "";

        switch (status) {
            case 'status_won':
                statusText = "Won <i class='euro_sign'>€</i>" + gift["wonMoney"] + " at " + moment(gift["drawDate"]).format("DD MMM YYYY");
                break;
            case 'status_not_active_remind':
            case 'status_not_active':
                statusText = "Didn't activate tickets yet";
                break;
            case 'status_play':
                if (type == 'five_tickets' || gift["gameType"] == "mumber") {
                    statusText = "Plays this " + drawDay + "!";
                }
                else {
                    statusText = "Plays on coming Jackpot";
                }
                break;
            case 'status_lost':
                statusText = "Lost on " + moment(gift["drawDate"]).format("DD MMM YYYY");
                break;
        }

        $(liElement).addClass(status);

        $(liElement).append(
            $("<span></span>").append(
                $("<h3></h3>").html(gift["receiverName"]).append(status == 'status_not_active_remind' ? $("<button>Remind</button>").attr("rel", gift["id"]).addClass("remind_button") : "")
            ).append(statusText)
        );

        $(ulElement).append($(liElement));
        count++;
    }

    if (type == 'five_tickets') {
        for (var i = parseInt(count) + 1; i <= 5; i++) {
            var liElement = $("<li></li>");
            $(liElement).addClass("select_friend");

            $(liElement).append(
                $("<span></span>").append(
                        $("<h3></h3>").html("Select Friend " + i)
                    ).click(function (e) {
                        $.mobile.changePage("five_ticket_receiver_data.html");
                    })
            );

            $(ulElement).append($(liElement));
        }
    }

    $(parentElement).append($(ulElement));

    $(".remind_button").on("touchend", function (e) {
        var self = $(this);
        callAuthorizedService("/gift/remindFriend", {"giftId": $(this).attr('rel')}, function (response) {
            navigator.notification.alert('Your friend has received reminder SMS', function(){}, 'Mumber', 'OK');
            self.remove();
        }, function (error) {
            navigator.notification.alert('Connection problem', function(){}, 'Mumber', 'OK');
        })
    });

//    $(".remind_button").on("click", function (e) {
//        callAuthorizedService("/gift/remindFriend", {"giftId": $(this).attr('rel')}, function (response) {
//            navigator.notification.alert('Your friend has received reminder SMS', function(){}, 'Mumber', 'OK');
//            $(this).remove();
//        }, function (error) {
//            navigator.notification.alert('Connection problem', function(){}, 'Mumber', 'OK');
//        })
//    });
}
