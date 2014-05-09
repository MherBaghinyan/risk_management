/**
 * Created with IntelliJ IDEA.
 * User: Karen.Gasparyan
 * Date: 5/19/13
 * Time: 8:30 PM
 * To change this template use File | Settings | File Templates.
 */
function JackpotCounter(){

var spanContainers = [];
var COUNTER_NUMS = 6;

function setJackpotNumbers(mainBlock, amount) {
    mainBlock.empty().addClass("jackpot_block");

    for (var i = 0; i < COUNTER_NUMS; i++) {
        var numBlock = $("<div></div>").addClass("jackpot_num_block");

        if (i % 3 == 0) {
            numBlock.addClass("jackpot_num_block" + (i + 1));
        }

        var jNum = parseInt(amount / Math.pow(10, COUNTER_NUMS - (i + 1))) % 10;
        spanContainers[i] = $("<span></span>");
        numBlock.append( spanContainers[i] .addClass("num" + jNum));

        mainBlock.append($(numBlock));
    }

    return mainBlock;
}

    return {
        createJackpotCounter : function (amount) {
            var mainBlock = $("<div></div>");
            return setJackpotNumbers($(mainBlock), amount);
        },
        updateJackpotCounter : function (amount) {
            for(var i = 0; i < COUNTER_NUMS; i++) {
                var jNum = parseInt(amount / Math.pow(10, COUNTER_NUMS - (i + 1))) % 10;
                spanContainers[i].attr("class","num" + jNum);
            }
        }
    }
}