const formatTime = function(time) {
    const timeInSeconds = time / 1000;
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = Math.floor(timeInSeconds % 60);

    if (hrs > 0) {
        return hrs + "h " + mins + "m " + secs + "s ";
    } else if (mins > 0) {
        return mins + "m " + secs + "s ";
    } else {
        return secs + "s ";
    }
};

module.exports = formatTime;
