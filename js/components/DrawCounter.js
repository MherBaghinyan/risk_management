function DrawCounter(){
    var timeNumbers = [];
    var spanContainers = [];
    var COUNTER_NUMS = 7;

    function getTimeLeftData(secs) {
        var s = secs;

        var hours = Math.floor(s / (60 * 60));
        var h1 = Math.floor(hours / 100);
        var h2 = Math.floor(hours / 10) % 10;
        var h3 = hours % 10;

        s -= hours * (60 * 60);

        var mins = Math.floor(s / 60);
        var m1 = Math.floor(mins / 10);
        var m2 = mins % 10;

        s -= mins * 60;

        var s1 = Math.floor(s / 10);
        var s2 = s % 10;

        return [h1, h2, h3, m1, m2, s1, s2];
    }

     function setDrawTimer(mainBlock, time){
        var timeData = getTimeLeftData(time);

        timeNumbers = [timeData.h1, timeData.h2, timeData.h3, timeData.m1, timeData.m2, timeData.s1, timeData.s2];



        for (var i = 0; i < COUNTER_NUMS; i++) {
            var numBlock = $("<div></div>").addClass("credit_num_block");

            if (i == 0 || i == 3 || i == 5) {
                $(numBlock).addClass("credit_num_block" + (i + 1));
            }

            spanContainers[i] = $("<span></span>");
            numBlock.append(spanContainers[i].addClass("credits" + timeNumbers[i]));

            mainBlock.append(numBlock);
        }

        return mainBlock;
    }

    function _updateDrawTimer(time){
        var timeData = getTimeLeftData(time);


        for (var i = 0; i < COUNTER_NUMS; i++) {
            spanContainers[i].get(0).className = "credits" + timeData[i];
        }
    }

    return {
        createDrawCounter : function(time){
            var mainBlock = $("<div></div>");
            $(mainBlock).addClass("credit_img_block");

            setDrawTimer(mainBlock, time);

            setInterval(function () {
                time--;
                _updateDrawTimer(time);
            }, 1000);

            return mainBlock;
        },

        updateDrawTimer: function(time){
            _updateDrawTimer(time);
        }
    };

}


