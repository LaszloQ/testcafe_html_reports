const getTotalDurration = function(obj) {
  const startingTime = new Date(obj.startTime);
  const endingTime = new Date(obj.endTime);

  return endingTime - startingTime;
};

module.exports = getTotalDurration;
