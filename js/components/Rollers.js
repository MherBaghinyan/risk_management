function createSelectRoller(screenWidth, elemId, elFrom, elTo, elLabel, preselectedValue)
{
    var rollerHeight;
    var paddingLeft = null;

    switch (folder)
    {
        case 1:
            rollerHeight = 53;
            break;
        case 2:
            rollerHeight = 70;
            break;
        case 3:
            rollerHeight = 90;
            break;
        case 4:
            rollerHeight = 140;
            paddingLeft = 1.8;
            break;
    }

    if(typeof elemId == 'string'){
        elemId = $("#" + elemId);
    }


    console.log(rollerHeight);
    for (var i = elFrom; i <= elTo; i++)
    {
        elemId.append($("<option " + (preselectedValue == i ? "selected" : "") + "></option>").attr("value", i).text(i + " " + elLabel));
    }

    elemId.mobiscroll().select({
        theme: 'ios',
        display: 'inline',
        mode: 'scroller',
        inputClass: 'i-txt',
        width: 200,
        height: rollerHeight,
        delay: 1000,
        onShow: function () {
            elemId.parent().find('.dwwc').css('width', screenWidth - 35);
            elemId.parent().find('.dwwc').css('padding-left', paddingLeft ? paddingLeft + '%' : '3.8%');
            elemId.parent().find('.dwwc').children(":first").attr('width', '96%');
        }
    });

}
