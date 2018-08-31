const obj = require("../reports/result.json");

const formatTime = function() {
    const hrs = Math.floor(obj.durationMs / 3600);
    const mins = Math.floor((obj.durationMs % 3600) / 60);
    const secs = Math.floor(obj.durationMs % 60);

    if (hrs > 0) {
        return hrs + "h " + mins + "m " + secs + "s ";
    } else if (mins > 0) {
        return mins + "m " + secs + "s ";
    } else {
        return secs + "s ";
    }
};

module.exports = formatTime;
