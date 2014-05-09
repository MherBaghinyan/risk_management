function createDateTimeRoller(screenWidth, elemId, selectCallback) {

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

    if (selectCallback == undefined)
        selectCallback = function () {
        };

    $('#' + elemId).mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        inputClass: 'i-txt',
        width: screenWidth / 3 - 30,
        height: rollerHeight,
        dateFormat: 'M dd, yyyy',
        dateOrder: 'ddmmyy',
        startYear: 1920,
        endYear: new Date().getFullYear(),
        onShow: function () {
            var el = $('#' + elemId).parent().find('.dwwc');
            el.css({
                'width': (screenWidth - 30),
                'padding-left': '0%'
            }).attr('width', '92%');
        },
        onSelect: selectCallback
    });

}
