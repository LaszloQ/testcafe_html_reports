const obj = require("../reports/result.json");

const getTotalDurration = function() {
    const startingTime = new Date(obj.startTime);
    const endingTime = new Date(obj.endTime);

    return endingTime - startingTime;
};

module.exports = getTotalDurration;
