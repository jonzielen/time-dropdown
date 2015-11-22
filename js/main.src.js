function createTimeList(options) {
    var times = [],
    timeRegExp = new RegExp(/^(?:0?\d|1[012]):[0-5]\d[APap][mM]$/),
    incRegExp = new RegExp(/^\d+$/);

    var options = {
        parent: options.parent || null,
        start: regExpTest(options.start, timeRegExp) || null,
        end: regExpTest(options.end, timeRegExp) || null,
        increment: regExpTest(options.increment, incRegExp) || null,
        selected: regExpTest(options.selected, timeRegExp) || null
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

    function twoDigitMinutes(time) {
        return (time < 10)? '0'+ time.toString() : time;
    }

    function millisecondsToTime(time) {
        mTime = new Date(time);
        var amPm = 'am';
        if (mTime.getHours() > 12) {
            return {
                hh: mTime.getHours() - 12,
                mm: twoDigitMinutes(mTime.getMinutes()),
                ampm: 'pm'
            };
        } else {
            amPm = (mTime.getHours() >= 12) ? 'pm' : amPm;
            return {
                hh: mTime.getHours(),
                mm: twoDigitMinutes(mTime.getMinutes()),
                ampm: amPm
            };
        }
    }

    function buildOption(times){
        console.log(options.selected);

        times.forEach(function(elem, index, array) {
            var option = document.createElement('option'),
            format = elem['hh']+':'+elem['mm']+elem['ampm'];

            option.value = format;
            option.text = format;
            option.selected = (format == options.selected) ? true : false;

            options.parent.appendChild(option);
        });
    }

    function incrementTime() {
        var start = stringToTime(options.start),
            end = stringToTime(options.end),
            increment = Number(options.increment) * 60000;

         start = timeToMilliseconds(start);
         end = timeToMilliseconds(end);

         while (start <= end) {
             times.push(millisecondsToTime(start));
             start = start + increment;
         }

         buildOption(times);
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
    parent: select,
    start: '7:30am',
    end: '9:30pm',
    increment: '15',
    selected: '12:00pm'
}).goTime();
