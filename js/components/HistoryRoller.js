function createHistoryRoller(screenWidth, elemId, elements) {
    var rollerHeight;

    switch (parseInt(getData("screenFolder"))) {
        case 1:
            rollerHeight = 53;
            break;
        case 2:
            rollerHeight = 88;
            break;
        case 3:
            rollerHeight = 90;
            break;
        case 4:
            rollerHeight = 140;
            break;
    }


    if (elements != undefined) {
        for (var i = 0; i < elements.length; i++) {
            var wrapperDiv = $("<div></div>").addClass((i % 2) ? "odd" : "even");
            $("#" + elemId)
                .append($("<option></option>").attr("value", i)
                    .text(
                        $("<div></div>").append($(wrapperDiv).append(generateText(elements[i]["eventType"], elements[i]["eventDate"], elements[i]["balanceChange"], elements[i]["payedMoney"], elements[i]["ticketsCount"]))).html()
                    )
                );
        }
    }
    $('#' + elemId).mobiscroll().select({
        theme: 'ios',
        display: 'inline',
        mode: 'scroller',
        inputClass: 'i-txt',
        width: 200,
        height: rollerHeight,
        delay: 1000,
        onShow: function () {
            $('#' + elemId).parent().find('.dwwc').css('width', screenWidth - parseInt(screenWidth * 2 / 100) * 2);
            $('#' + elemId).parent().find('.dwwc').css('padding-left', '2%');
            $('#' + elemId).parent().find('.dwwc').children(":first").attr('width', '620');
        }
    });
}

function createHistoryElements() {
}