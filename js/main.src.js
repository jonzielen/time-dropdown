function createTimeList(options) {
    var times = [],
    timeRegExp = new RegExp(/^(?:0?\d|1[012]):[0-5]\d[APap][mM]$/),
    incRegExp = new RegExp(/^\d+$/);

    var options = {
        'start': regExpTest(options.start, timeRegExp) || null,
        'end': regExpTest(options.end, timeRegExp) || null,
        'increment': regExpTest(options.increment, incRegExp) || null,
        'selected': regExpTest(options.selected, timeRegExp) || null,
        'format': options.format || null
    };

    function regExpTest(val, reg) {
        return (reg.test(val))? val : null;
    }

    function error(options) {
        var errorMessage = '';
        for (var i in options) {
            if (options[i] === null) {
                errorMessage += 'The formating for "'+i+'" is incorrect. ';
            }
        }

        return errorMessage;
    }

    function stringToTime(time) {
        var pm = (time.slice(-2) == 'pm') ? 12 : 0;
        time = time.substring(0, time.length - 2).split(':').map(Number);
        time[0] = time[0]+pm;
        return time;
    }

    function timeToMilliseconds(time) {
        mTime = new Date();
        mTime.setHours(time[0], time[1], 00);
        return Date.parse(mTime);
    }

    function timeToString(time) {
        // if (time < 10) {
        //     return '0'+ time.toString();
        // } else {
        //     time.toString();
        // }
    }

    function millisecondsToTime(time) {
        mTime = new Date(time);
        var amPm = 'am';
        if (mTime.getHours() > 12) {
            console.log((mTime.getHours() - 12), mTime.getMinutes(), 'pm');
        } else {
            amPm = (mTime.getHours() >= 12) ? 'pm' : amPm;
            console.log(mTime.getHours(), mTime.getMinutes(), amPm);
        }
    }

    function incrementTime() {
        var start = stringToTime(options.start),
            end = stringToTime(options.end),
            increment = Number(options.increment) * 60000;

         var startTime = timeToMilliseconds(start);
         var endTime = timeToMilliseconds(end);

         while (startTime <= endTime) {
             times.push(millisecondsToTime(startTime));
             startTime = startTime + increment;
         }
    }

    function goTime() {
        return (error(options) == '')? incrementTime() : console.log(error(options));
    }

    return {
        goTime: goTime
    };

}

var select = document.querySelector('#times');

createTimeList({
    start: '7:30am',
    end: '9:30pm',
    increment: '15',
    selected: '12:00pm',
    format: 'hh:mm'
}).goTime();