function createTimeList(options) {
    var times = [];

    function testEnteredUserTime(time) {
        var timeFormat = new RegExp(/^(?:0?\d|1[012]):[0-5]\d[APap][mM]$/);
        var res = timeFormat.test(time);

        return (res === true)? time : error(time);
    }

    function testIncrementTime(increment) {
        var incrementFormat = new RegExp(/^\d+$/);
        var res = incrementFormat.test(increment);

        return (res === true)? increment : error(increment);
    }

    function error(option) {
        console.log('The format for "'+option+'" is incorrect.');
    }

    var options = {
        'start': testEnteredUserTime(options.start) || '',
        'end': testEnteredUserTime(options.end) || '',
        'increment': testIncrementTime(options.increment) || '',
        'selected': testEnteredUserTime(options.selected) || '',
        'format': options.format || 'jom'
    };

    if (options.hasOwnProperty('jom')) {
        console.log('something is empty');
    }

    function incrementTime() {
        console.log(times);
        console.log(options);

        var d = new Date();
        d.setHours(7);
        d.setMinutes(30);
        d.setSeconds(00);

        //console.log(d);




    }






    function goTime() {
        incrementTime();
        //console.log();
    }

    return {
        goTime: goTime
    };

}

var select = document.querySelector('#times');

createTimeList({
    start: '7:00am',
    end: '9:00pm',
    increment: '1',
    selected: '12:00pm'
}).goTime();
