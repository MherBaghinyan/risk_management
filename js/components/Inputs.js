/**
 * Background type possible values are
 *              'usual' - inputs with white background and shadow
 *              'yellow' - inputs with yellow gradient background
 */
var inputsBackgroundType = '';

function createInputs(parentElem, inputs, cssClass, formId, screenWidth, options) {
    if (options && options['backgroundType']) {
        inputsBackgroundType = options['backgroundType'];
    }

    var formElement = $("<form></form>").attr("id", formId);
    var divElement = $("<div></div>").addClass(cssClass);

    var inputMiddle = new InputMiddle(screenWidth);
    var inputBottom = new InputBottom(screenWidth);
    var inputSingle = new InputSingle(screenWidth);
    var inputTop = new InputTop(screenWidth);

    for (var input in inputs) {
        var inputsSize;

        if (inputs.length == 1) {
            inputsSize = inputSingle;
        }
        else if (input == 0) {
            inputsSize = inputTop;
        }
        else if (input == inputs.length - 1) {
            inputsSize = inputBottom;
        }
        else {
            inputsSize = inputMiddle;
        }

        var wrappedInput = eval("create" + inputs[input]["type"] + "(inputs[input], inputsSize, screenWidth);");
        $(divElement).append($(wrappedInput));
    }

    $(formElement).append($(divElement));

    parentElem.append($(formElement));
}

var wrapIntoDiv = function (el, inputElement, input, screenSize) {
    if (inputsBackgroundType == '' || inputsBackgroundType == 'usual') {
        var leftImage = $('<img />').attr("src", 'images/' + input.screenSizeIndex + '/input_' + input.inputPosition + '_left.png');
        var rightImage = $('<img style="margin-left: -1px;" />').attr("src", 'images/' + input.screenSizeIndex + '/input_' + input.inputPosition + '_right.png');

        var div = $("<div></div>").addClass("floatL").css("padding-left", "" + input.padding + "px")
            .append(
                $("<span></span>").addClass("floatL inpLeft").css('width', input.inputLeftWidth).css('height', input.inputHeight)
                    .append(leftImage)
            ).append(
                $("<span></span>").addClass("floatL inpMiddle inp" + capitaliseFirstLetter(input.inputPosition) + "Middle").css('width', input.getInputMiddleWidth).css('height', input.inputHeight)
                    .append(
                        $(el).css({
                            "height": input.inputHeight,
                            "line-height" : input.inputHeight + "px"
                        })
                    )
            ).append(
                $("<span></span>").addClass("floatL inpRight").css('width', input.inputRightWidth).css('height', input.inputHeight)
                    .append(rightImage)
            );

        if (inputElement.info) {
            div.append('<div class="input_info_tip" onclick="javascript:navigator.notification.alert(\'' + inputElement.info + '\');"><div>');
        }

        return div;
    }
    else {
        var div = $("<div></div>").addClass("floatL").css("padding-left", "" + input.padding + "px")
            .append(
                $("<span></span>").addClass("floatL inpLeft").css('width', input.inputLeftWidth).css('height', input.inputHeight).css('background', 'yellow')
            ).append(
                $("<span></span>").addClass("floatL inpMiddle").css('width', input.getInputMiddleWidth).css('height', input.inputHeight)
                    .append(
                        $(el).css({
                            "height": input.inputHeight
                        })
                    ).css('background', 'red')
            ).append(
                $("<span></span>").addClass("floatL inpRight").css('width', input.inputRightWidth).css('height', input.inputHeight).css('background', 'blue')
            );
        return div;
    }
};

var createmumberid = function(input, inputSize, screenSize){
    var inputElement = $("<input />").attr({
        "type": "tel",
        "name": input.name,
        "placeholder": input.placeholder,
        "value": input.value
    }).css("width", "65%");

    var userCountry = getData("country");
    var flagContainer = null, flagImg = null;

    var countries = {};

    var phonePrefixBlock = $("<span />").attr("class", "phone-prefix");


    var changeCountry = function(countryCode){


        if(flagImg != null)
            flagImg.attr('src', 'images/' + folder + '/flag_' + countryCode + '.png');

        if(countries[countryCode] != undefined){
            phonePrefixBlock.text(countries[countryCode][1]);
        }

        switch (countryCode)
        {
            case 'NL':
                inputElement.mask('(0)6 - ?99 99 99 99');
                break;
            case 'GB':
                inputElement.mask('(0)7 - ?999 999999');
                break;
            default :
                inputElement.mask('?99 99 99 99 99 99 99 99');
                break;
        }

        writePlainData("countryName", countries[countryCode][0]);
//        writePlainData("country", countryCode);
    };

    callService("/country/getCountries", {}, function(response){

        for(var country in response.responseText)
        {
            countries[response.responseText[country].name] = [response.responseText[country].displayName, response.responseText[country].phonePrefix];
        }

        var flagsContainer = $("<ul />").attr("id", input.name + "Container");
        var flagsBlock = $("<div />").attr("id", input.name + "Block");

        for(var country in countries){
            flagsContainer.append(
                $("<li />").attr("data-val", country).append(
                    $("<div />").attr("class", "row_container").append(
                            $("<img />").attr("src", "images/" + folder + "/flag_" + country + ".png")

                    ).append(
                        $("<span />").text(countries[country][0])
                    )
                )
            );
        }
//        $("body").append(flagsBlock.append(flagsContainer));


        var rollerHeight = 140;

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

        flagsContainer.mobiscroll().image({
            theme: 'ios',
            display: 'bottom',
            mode: 'scroller',
            height: rollerHeight,
            width: screenWidth - 30,
            rollerHeight: rollerHeight,
            defaultValue: [userCountry],
            inputClass: 'i-txt',
            onSelect: function(value){
                changeCountry(value);
            }
        });

        flagContainer.click(function(){
            flagsContainer.mobiscroll('show');
        });

        changeCountry(userCountry ? userCountry : 'US');

        phonePrefixBlock.text(countries[userCountry][1]);

    });



    if (input.disabled == "disabled") {
        $(inputElement).attr("disabled", "disabled");
    }

    flagImg = $("<img src='images/" + folder + "/flag_" + (userCountry ? userCountry : 'US') + ".png' />");
    var flagContainer = $("<span />").append(flagImg).append(phonePrefixBlock).addClass("country-flag");




    var wrapperDiv = wrapIntoDiv($("<span/>").append(flagContainer).append(inputElement), input, inputSize, screenSize);

    return wrapperDiv;
};

var createcheck = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "text",
        "name": input.name,
        "placeholder": input.placeholder,
        "rel": "check",
        "data": input.url,
        "redirectUrl": input.redirectUrl
    }).css({
            "width": inputSize.getInputMiddleWidth - inputSize.inputLeftWidth - inputSize.inputRightWidth,
            "height": inputSize.inputHeight + "px",
            "line-height" : inputSize.inputHeight + "px",
            "float": "left"
        });

    var imgElement = $("<img />").attr("style", "position: relative").attr('src', "images/" + inputSize.screenSizeIndex + "/confirm_invalid_icon.png").load(function () {
        $(this).css({
            'top': inputSize.inputHeight / 8,
            'left': inputSize.inputRightWidth
        });
    });

    var div = $("<div></div>").append(inputElement).append(imgElement);

    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    $(inputElement).on("keyup", function (e) {
        if (input["checkfunc"] == undefined)
            check($(this), input.callback);
        else
            input["checkfunc"]($(this));
    });

    return wrapperDiv;
};

var createpasswordcheck = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "password",
        "name": input.name,
        "placeholder": input.placeholder,
        "rel": "passwordcheck",
        "data": input.url
    }).css({
            "width": inputSize.getInputMiddleWidth - inputSize.inputLeftWidth - inputSize.inputRightWidth,
            "height": inputSize.inputHeight + "px",
            "line-height" : inputSize.inputHeight + "px",
            "float": "left",
            "font-family" : "Verdana"
        });

    var imgElement = $("<img />").attr("style", "position: relative").attr('src', "images/" + inputSize.screenSizeIndex + "/confirm_invalid_icon.png").load(function () {
        $(this).css({
            'top': inputSize.inputHeight / 8,
            'left': inputSize.inputRightWidth
        });
    });

    var div = $("<div></div>").append(inputElement).append(imgElement);

    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    $(inputElement).on("keyup", function (e) {
        //check($(this));
    });

    return wrapperDiv;
};

var createselect = function (input, inputSize, screenSize) {
    var selectElement = $("<select></select>").css({
        'position': 'relative',
        'display': 'block',
        'opacity': 0,
        'z-index': 100,
        'width': inputSize.getInputMiddleWidth + inputSize.inputLeftWidth + inputSize.inputRightWidth,
        'height': inputSize.inputHeight + "px",
        'top': -inputSize.inputHeight,
        'left': -inputSize.inputLeftWidth,
        'font-size': inputSize.inputHeight + "px"
    }).append(getOptions(input.values));

    var inputElement = $("<input />").attr({
        "type": "text",
        "name": input.name,
        "placeholder": input.placeholder
    }).css({
            "height": inputSize.inputHeight
        });

    var imgElement = $("<img />").attr("style", "position: relative").attr('src', "images/" + inputSize.screenSizeIndex + "/select_arrow" + (input.disabled ? "_disabled" : "") + ".png").addClass('input_select_arrow')

    $(selectElement).bind("change", function () {
        $(inputElement).val($(selectElement).find("option:selected").text());
    });

    var div = $("<div></div>").append(inputElement).append(selectElement).append(imgElement);

    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    return wrapperDiv;
}

var createtext = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "text",
        "name": input.name,
        "value": input.value,
        "placeholder": input.placeholder
    });

    var wrapperDiv = wrapIntoDiv(inputElement, input, inputSize, screenSize);

    return wrapperDiv;
}

var createhidden = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "hidden",
        "name": input.name,
        "value": input.value
    });

    return inputElement;
}

var createdatescroller = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "text",
        "name": input.name,
        "value": input.value,
        "placeholder": input.placeholder,
        "id": input.id
    }).css({"width": "86%"});

//    var imgElement = $("<img />").attr("style", "position: relative").attr('src', "images/" + inputSize.screenSizeIndex + "/select_arrow" + (input.disabled ? "_disabled" : "") + ".png").addClass('input_select_arrow')

    var imgElement = $("<img />").attr("style", "position: relative; top: 15px").attr('src', "images/" + inputSize.screenSizeIndex + "/select_arrow" + (input.disabled ? "_disabled" : "") + ".png").addClass('input_select_arrow')
    var div = $("<div></div>").append(inputElement).append(imgElement);//.append(imgElement);



    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    return wrapperDiv;
}

var createpassword = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "password",
        "name": input.name,
        "placeholder": input.placeholder
    }).css({
            'font-family': "Verdana"
        });

    var wrapperDiv = wrapIntoDiv(inputElement, input, inputSize, screenSize);

    return wrapperDiv;
}

var createcheckbox = function (input, inputSize, screenSize) {
    var inputElement = $("<span></span>").text(
        input.placeholder
    ).addClass('input-checkbox').css({"width": "67%" });

    var checkboxElement = $("<input />").attr({
        "name": input.name,
        "type": "checkbox",
        "id": input.id
    });

    if (input.checked) {
        checkboxElement.attr("checked", "checked");
    }

    var wrapperDiv = wrapIntoDiv($("<div></div>").css("line-height", inputSize.inputHeight + "px").append(inputElement).append(checkboxElement), input, inputSize, screenSize);

    return wrapperDiv;
}

var createemail = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "email",
        "name": input.name,
        "placeholder": input.placeholder,
        "value": input.value
    });

    if (input.disabled == "disabled") {
        $(inputElement).attr("disabled", "disabled");
    }

    var wrapperDiv = wrapIntoDiv(inputElement, input, inputSize, screenSize);

    return wrapperDiv;
}

var createtel = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "tel",
        "name": input.name,
        "placeholder": input.placeholder,
        "value": input.value
    });

    var wrapperDiv = wrapIntoDiv(inputElement, input, inputSize, screenSize);

    return wrapperDiv;
}

var createlink = function (input, inputSize, screenSize) {
    var inputElement = $("<input />").attr({
        "type": "text",
        "name": input.name,
        "value": input.placeholder,
        "disabled": "disabled"
    }).css({
            "width": inputSize.getInputMiddleWidth - inputSize.inputLeftWidth - inputSize.inputRightWidth,
            "color": "black"
        });

    var imgElement = $("<img />").attr("style", "position: relative").attr('src', "images/" + inputSize.screenSizeIndex + "/select_arrow" + (input.disabled ? "_disabled" : "") + ".png").addClass("input_link_arrow")

    var div = $("<div></div>").append(inputElement).append(imgElement);

    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    if (!input.disabled) {
        if (!input.callback) {
            input.callback = function () {
                $.mobile.changePage(input["url"]);
            };
        }

        $(wrapperDiv).on("click", input.callback);
    }

    return wrapperDiv;
};

var createspanlink = function (input, inputSize, screenSize) {
    var inputElement = $("<span></span>").attr({
        "name": input.name,
        "id" : input.id ? input.id : "id" + input.name
    }).html(input.placeholder).css({
            "width": inputSize.getInputMiddleWidth - inputSize.inputLeftWidth - inputSize.inputRightWidth
        });

    if(input.disabled){
        inputElement.css("color", "grey");
    }

    var imgElement = $("<img />").attr("style", "position: relative").attr({
        'src' : "images/" + inputSize.screenSizeIndex + "/select_arrow" + (input.disabled ? "_disabled" : "") + ".png",
        'data-url' : input['url']
    }).addClass("input_link_arrow")

    var div = $("<div></div>").append(inputElement).append(imgElement);

    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    if (!input.disabled && !input.disableHref) {
        if (!input.callback) {
            input.callback = function () {
                $.mobile.changePage(imgElement.attr('data-url'));
            };
        }

    } if(typeof input.callback === 'function'){
        $(wrapperDiv).click(function(){
            input.callback.call(this);
        })
    }

    return wrapperDiv;
};

var createtextarea = function (input, inputSize, screenSize) {
    var inputElement = $("<textarea></textarea>").attr({
        "name": input.name,
        "placeholder": input.placeholder
    }).text(input.value).css({
            "width": inputSize.getInputMiddleWidth - inputSize.inputLeftWidth - inputSize.inputRightWidth
        });

    var div = $("<div></div>");


//    var wrapperDiv = wrapIntoDiv(div, input, inputSize, screenSize);

    return inputElement;

};

function changeInputValue(inputIndex, value) {
}

function getOptions(values) {
    var options = "<option></option>";

    for (var value in values) {
        options += "<option value='" + value + "'>" + values[value] + "</option>";
    }

    return options;
}

function check(inp, callback) {
    var sendData = {
        activationCode: $(inp).val()
    };

    callAuthorizedService("/" + $(inp).attr("data"), sendData, function (responseData) {
            if (responseData.status == 'error') {
                // activation code still wrong
            }
            else {
                var inactiveSrc = $(inp).parent().find("img").attr("src");
                $(inp).parent().find("input").prop('disabled', true);

                var activeSrc = inactiveSrc.replace("confirm_invalid_icon", "confirm_valid_icon");

                $(inp).parent().find("img").attr("src", activeSrc);

                if (responseData.activationStatus === 'ACTIVATED') {
                    if (callback != undefined) {
                        callback();
                    }
                    setTimeout(function () {
                        if ($(inp).attr("redirectUrl"))
                            $.mobile.changePage($(inp).attr("redirectUrl"));
                    }, 2000);
                }
            }
        },
        function (errMsg) {
            navigator.navigate.alert(errMsg);
        });

}

function checkPassword(inp) {
    var sendData = {
        password: $(inp).val()
    };

    callAuthorizedService("/" + $(inp).attr("data"), sendData, function (responseData) {
        if (responseData.status == 'error') {
            var inactiveSrc = $(inp).parent().find("img").attr("src");

            var activeSrc = inactiveSrc.replace("confirm_valid_icon", "confirm_invalid_icon");

            $(inp).parent().find("img").attr("src", activeSrc);
        }
        else {
            var inactiveSrc = $(inp).parent().find("img").attr("src");

            var activeSrc = inactiveSrc.replace("confirm_invalid_icon", "confirm_valid_icon");

            $(inp).parent().find("img").attr("src", activeSrc);
        }
    }, function (errMsg) {
        navigator.navigate.alert(errMsg);
    });
}