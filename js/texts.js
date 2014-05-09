var historyTexts = {
    "TicketActivationFromCardEvent": {
        "description": "Ticket(s) are bought"
    },
    "CreditTopUpEvent": {
        "description": "Credit(s) are topped up"
    },
    "CreditTransferToBankAccountEvent": {
        "description": "Credit(s) transferred to bank account"
    },
    "AmountToCreditEvent": {
        "description": "Won amount transferred to credits"
    },
    "FreeTicketActivationEvent": {
        "description": "Free ticket received & activated"
    },
    "ActivateGiftTicketEvent": {
        "description": "Gift ticket received & activated"
    },
    "TicketActivationBySubscriptionEvent": {
        "description": "Ticket(s) purchased and activated by subscription"
    },
    "TicketActivationFromCreditEvent": {
        "description": "Ticket(s) activated from credits"
    },
    "TicketPurchaseEvent": {
        "description": "Ticket(s) purchased"
    },
    "GiveTicketEvent": {
        "description": "Ticket(s) are given as a Gift"
    },
    "LoseEvent": {
        "description": "Ticket(s) lost at regular draw"
    },
    "LoseEvent": {
        "description": "Ticket(s) lost at jackpot draw"
    },
    "WonEvent": {
        "description": "Won at regular draw"
    },
    "TicketActivationFromWonAmountEvent": {
        "description": "Ticket(s) activated from won amount"
    },
    "TicketDeactivationEvent": {
        "description": "Ticket(s) deactivated"
    },
    "WonAmountTransferToBankAccountEvent": {
        "description": " Transferred to bank account"
    },
    "NoEventType": {
        "description": "No event description available"
    }
};

var generateText = function (eventType, eventDate, leftText, payedMoney, ticketsCount) {
    if (historyTexts[eventType] == null) {
        eventType = "NoEventType";
    }

    var isWonAmount = false;
    if( eventType == "WonAmountTransferToBankAccountEvent")
    {
        isWonAmount = true;
        leftText = payedMoney;
    }

    var leftTextSign = parseFloat(leftText) > 0 ? "+" : parseFloat(leftText) < 0 ? "-" : "";
    var response = $("<div></div>").append($("<div></div>").addClass("history_description").html( (ticketsCount != null ? ticketsCount : (leftText != null && leftText != 0 ? "<span style='font-family:Helvetica;'>&#128;</span>" + "<span class='money'>" + leftText + "</span>" : "" ))+ " " + historyTexts[eventType].description)).
        append($("<div></div>").addClass("history_date").text(moment(new Date(eventDate)).format("DD MMM YYYY"))).
        append($("<div></div>").addClass("history_amount").html(payedMoney != null && !isWonAmount ? ("paid " + "<span style='font-family:Helvetica;'>&#128;</span>" + "<span class='money'>" + "<span class='money'>" + Math.abs(parseFloat(payedMoney)) + "</span>") + "</span>" : "  " )).
        append($("<div></div>").addClass("history_amount").html((leftText != null && leftText != 0 && !isWonAmount) ? ("credits " + leftTextSign + "<span style='font-family:Helvetica;'>&#128;</span>" + "<span class='money'>" + Math.abs(parseFloat(leftText))) + "</span>" : "  " ));

    return response.html();
}