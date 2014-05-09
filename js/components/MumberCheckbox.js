var checkboxCoefficientsCache = [];

$.fn.mumberCheckbox = function () {
    var startMumberCheckboxDragging = false;

    var startMumberCheckboxDraggingPosition;

    var sizeCoefficients = [0.5, 0.75, 1, 1.3, 2];

    var getCoefficients = function (sizeCoefficients){

        if(checkboxCoefficientsCache[sizeCoefficients]){
            return checkboxCoefficientsCache[sizeCoefficients];
        }
//

        var sizes = {};
//        sizes.cbBtnPadding = 0 * sizeCoefficients; //?
        sizes.cbDivWidth = 131 * sizeCoefficients;
        sizes.cbDivHeight = 53 * sizeCoefficients;
        sizes.cbDivBgInitialPosition = 103 * sizeCoefficients;
        sizes.cbDivBorderRadius = 25 * sizeCoefficients;
        sizes.cbBtnMaxPosition = 80 * sizeCoefficients;
        sizes.cbContainerHeight = 50 * sizeCoefficients;
        sizes.cbContainerShadow= 5 * sizeCoefficients;


        checkboxCoefficientsCache[sizeCoefficients] = sizes;

        return checkboxCoefficientsCache[sizeCoefficients];
    };

    var sizes = getCoefficients(sizeCoefficients[folder]);

    var lastClickTime = 0;
    var delta = 0;
    var current = new Date().getTime();

    this.each(function(){
        var checkBox= $(this);
        checkBox.get(0).style.display = "none";

        var onOffBtn = document.createElement('img');
        onOffBtn.src= "images/" + folder + "/on_off_btn.png";
        onOffBtn.style.padding = 0 + "px";
        onOffBtn.style.position = "relative";


        var onOffSlider = document.createElement('div');
        onOffSlider.style.width = sizes.cbDivWidth + "px";
        onOffSlider.style.height = sizes.cbDivHeight + "px";
        onOffSlider.style.background='url(\'images/' + folder + '/cb_on_off.png\') -' + sizes.cbDivBgInitialPosition + 'px 0';
        onOffSlider.style.MozBorderRadius= sizes.cbDivBorderRadius + "px";
        onOffSlider.style.WebkitBorderRadius = sizes.cbDivBorderRadius + "px";
        onOffSlider.style.borderRadius = sizes.cbDivBorderRadius + "px";

        var overLayer = document.createElement('div');
        overLayer.style.width = sizes.cbDivWidth + "px";
        overLayer.style.height =   sizes.cbDivHeight + "px";
        overLayer.style.background = "orange";
        overLayer.style.position = "absolute";
        overLayer.style.top = "0px";
        overLayer.style.opacity = 0.001;
        overLayer.className = "clickable_div";

        var firstClick = true;
        $(overLayer).bind("mousedown touchstart", function (e) {
            console.log("mouseup touchstart");

            firstClick = !firstClick;

            if (firstClick) {
                return;
            }
            current = new Date().getTime();
            delta = current - lastClickTime;

            startMumberCheckboxDragging = true;

            startMumberCheckboxDraggingPosition = e.pageX - parseInt(onOffBtn.style.left);
            lastClickTime = current;
        }).bind("mouseup touchend",function (e) {
                console.log("mouseup touchend");
                if (delta < 400) {
                }
                else {
                    if (onOffBtn.style.left == '0px') {
                        moveOnOffBtn($(this), sizes.cbBtnMaxPosition);
                        startMumberCheckboxDragging = false;
                        return;
                    }
                    else if (onOffBtn.style.left == '' + sizes.cbBtnMaxPosition + 'px') {
                        moveOnOffBtn($(this), 0);
                        startMumberCheckboxDragging = false;
                        return;
                    }
                    finishDragging($(this));
                }
            }
        ).bind("mouseout touchend",function (e) {
                finishDragging($(this));
            }
        ).bind("mousemove touchmove", function (e) {
                e.preventDefault();
                var leftTo = e.pageX - startMumberCheckboxDraggingPosition;

                if (startMumberCheckboxDragging && leftTo >= 0 && leftTo <= sizes.cbBtnMaxPosition) {
                    moveOnOffBtn($(this), leftTo);
                }
            }
        );

        $(onOffSlider).append($(onOffBtn));

        var checkBoxContainer = document.createElement('div');
        checkBoxContainer.style.float = "right";
        checkBoxContainer.style.position = "relative";
        checkBoxContainer.style.WebkitBorderRadius =  sizes.cbDivBorderRadius  + "px";
        checkBoxContainer.style.borderRadius =  sizes.cbDivBorderRadius  + "px";
        checkBoxContainer.style.MozBorderRadius =  sizes.cbDivBorderRadius  + "px";
        checkBoxContainer.style.overflow = "hidden";
        checkBoxContainer.style.height =  sizes.cbContainerHeight + "px";
        checkBoxContainer.style.boxShadow = '' + sizes.cbContainerShadow + 'px ' + sizes.cbContainerShadow + 'px ' + (sizes.cbContainerShadow / 2) + 'px #aaa';
        checkBoxContainer.className = "input_cb_div_container";

        $(checkBoxContainer).append($(onOffSlider));

        $(checkBoxContainer).append($(overLayer));

        $(this).parent().append($(checkBoxContainer));

        if ($(this).is(':checked')) {

            onOffBtn.style.left= sizes.cbBtnMaxPosition + "px";
            onOffSlider.style.backgroundPosition=  (-sizes.cbDivBgInitialPosition + sizes.cbBtnMaxPosition) + "px 0";

        } else {
            onOffBtn.style.left =  0 + "px";
        }

        function finishDragging(elem) {
            startMumberCheckboxDragging = false;

            if (parseInt(onOffBtn.style.left) > sizes.cbBtnMaxPosition / 2) {
                moveOnOffBtn($(elem), sizes.cbBtnMaxPosition);
            }
            else {
                moveOnOffBtn($(elem), 0);
            }
        }

        function moveOnOffBtn(sliderButton, leftTo) {

            onOffBtn.style.left= leftTo + "px";
            onOffSlider.style.backgroundPosition=  (-sizes.cbDivBgInitialPosition + leftTo) + "px 0";

            if (leftTo == 0 && $(checkBox).is(':checked')) {
                $(checkBox).click();
                $(checkBox).removeAttr("checked");
            }
            else if (leftTo == sizes.cbBtnMaxPosition && !$(checkBox).is(':checked')) {
                $(checkBox).click();
                $(checkBox).prop("checked", "checked");
            }
        }


        $.fn.mumberCheckbox.setButtonStateOff = function (el) {
            moveOnOffBtn($(el), 20);
            finishDragging($(el));
        }

    });
};



