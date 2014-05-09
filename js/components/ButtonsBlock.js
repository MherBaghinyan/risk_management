function createButtonsBlock(links, wrapperBlock, screenWidth) {
    var fbButton = new FacebookLoginButton(screenWidth);
    $(wrapperBlock).css("margin-left", "" + fbButton.padding + "px");
    $(wrapperBlock).css("width", fbButton.buttonLeftWidth + fbButton.getButtonMiddleWidth + fbButton.buttonRightWithWithArrow + "px");


    for (var i = 0; i < links.length; i++) {
        $(wrapperBlock).append(
            $("<a></a>").attr({
                "href": "#",
                "data-role": "none"
            }).text(links[i].label).click(links[i].callback)
        );
    }
}

function createSettingsButtonsBlock(blocks, wrapperBlock, screenWidth) {
    for (var i in blocks) {
        var block = blocks[i];
        var wrapperDiv = $("<div></div>").addClass("settings_container_rows").on("vclick", block.startCallback);

        var labelSpan = $("<span></span>").addClass("settings_field").html(block.label);
        var dataSpan = $("<span></span>").addClass("settings_field_data");
        if (block.inputType != "checkbox") {

            if (block.inputType == "date")
                $(dataSpan).html(
                    getUserDataField(block.fieldName) != null ? moment(new Date(getUserDataField(block.fieldName))).format("MMM DD, YYYY") : ""
                );
            else if (block.inputType == "password")
                $(dataSpan).html("********");
            else
                $(dataSpan).html(
                    getUserDataField(block.fieldName) != null ? (block.fieldName == "gender" ? capitaliseFirstLetter(getUserDataField(block.fieldName).toLowerCase()) : getUserDataField(block.fieldName)) : ""
                );
        }
        $(wrapperDiv).append($(labelSpan)).append($(dataSpan));

        switch (block.inputType) {
            case "text":
                var input = $("<input />")
                    .attr({
                        "type": "text",
                        "data-role": "none",
                        "id": block.fieldName,
                        "name": block.fieldName,
                        "value": getUserDataField(block.fieldName)
                    })
                    .addClass("settings_field_input")
                    .css({
                        "position": "absolute",
                        "left": "0px",
                        "text-align": "right",
                        "opacity": "0"
                    })
                    .on("click", block.endCallback);

                if(block.disabled){
                    input.attr("disabled", "disabled");
                }
                $(wrapperDiv).append(
                    input
                );
                break;
            case "select":
                var select = $("<select></select>")
                    .append($("<option></option>").html(""))
                    .addClass("settings_field_input").css({
                        "position": "absolute",
                        "left": "0px",
                        "text-align": "right",
                        "opacity": "0"
                    })
                    .attr({
                        "name": block.fieldName
                    })
                    .on("change", block.endCallback);

                    for (var j in block.values) {
                        var option = block.values[j];
                        var optionEl = $("<option></option>").attr({
                            "value": option
                        }).html(option);

                        if (getUserDataField(block.fieldName) != null &&
                            option != null && getUserDataField(block.fieldName).toUpperCase() == option.toUpperCase())
                            $(optionEl).attr("selected", "selected");
                        $(select).append(
                            $(optionEl)
                        )
                    };

                $(wrapperDiv).append($(select));

                break;

            case "date":
                var date = moment(new Date(getUserDataField(block.fieldName))).format("MMM DD, YYYY");
                $(wrapperDiv).append(
                    $("<input />")
                        .attr({
                            "type": "text",
                            "data-role": "none",
                            "id": block.fieldName,
                            "name": block.fieldName,
                            "value": date
                        })
                        .addClass("settings_field_input")
                        .css({
                            "position": "absolute",
                            "left": "0px",
                            "text-align": "right",
                            "opacity" : "0"
                        })
                );

                break;
            case "checkbox":
                var cb = $("<input />")
                    .attr({
                        "type": "checkbox",
                        "data-role": "none",
                        "id": block.fieldName,
                        "name": block.fieldName,
                        "type": "checkbox",
                        "value": getJsonDataByKey("otherSettings", block.fieldName)
                    })
                    .css({
                        "position": "absolute",
                        "left": "0px",
                        "text-align": "right"
                    })
                $(wrapperDiv).append(
                    cb
                );
                $(cb).prop("checked", getJsonDataByKey("otherSettings", block.fieldName));

                break;

            case "password":
                var input =  $("<input />")
                    .attr({
                        "type": "password",
                        "data-role": "none",
                        "id": block.fieldName,
                        "name": block.fieldName,
                        "value": '********'
                    })
                    .addClass("settings_field_input")
                    .css({
                        "position": "absolute",
                        "left": "0px",
                        "text-align": "right",
                        "opacity": "0"
                    })
                    .on("blur", block.endCallback);
                if(block.disabled){
                    input.attr("disabled", "disabled");
                }
                $(wrapperDiv).append(
                    input
                );
                break;
        }
        $(wrapperBlock).append($(wrapperDiv));
    }
}