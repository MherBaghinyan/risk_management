function createExpireDateRoller(screenWidth, elem) {

    var rollerHeight;

    switch (parseInt(getData("screenFolder"))) {
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
            break;

    }

    var now = new Date();

    elem.mobiscroll().date({
        theme: 'ios',
        display: 'modal',
        mode: 'scroller',
        inputClass: 'i-txt',
        width: screenWidth / 2 - 30,
        height: rollerHeight,
        dateFormat: 'mm/y',
        dateOrder: 'mmyy',
        startYear: now.getFullYear(),
        endYear: now.getFullYear() + 10,
        onShow: function () {
            elem.parent().find('.dwwc').css('width', screenWidth);
            elem.parent().find('.dwwc').css('padding-left', '2%');
            elem.find('.dwwc').children(":first").attr('width', '94%');
        }
    });

}
