const getTotalDuration = require("./total_duration.js");
const formatTime = require("./format_time.js");

module.exports = function(obj) {
  const fixtures = obj.fixtures;

  const getNumberOfFailedTests = function() {
    return obj.total - obj.passed;
  };

  const getNumberOfTotalTests = function() {
    return obj.total + obj.skipped;
  };

  const isTestPassed = function(skipped, errors) {
    return !skipped && errors.length === 0
  };

  const isTestFailed = function(skipped, errors) {
    return !skipped && errors.length > 0
  };

  const isFixtureFailed = function(fixture) {
    const tests = fixture.tests;
    let boolean;

    for (let i = 0; i < tests.length; i++) {
      if (tests[i].failed) {
        return true;
      } else {
        boolean = false;
      }
    }

    return boolean;
  };

  const isFixtureSkipped = function(fixture) {
    const tests = fixture.tests;
    let bool;

    for (let i = 0; i < tests.length; i++) {
      if (tests[i].skipped) {
        bool = true;
      } else {
        return false;
      }
    }
    return bool;
  };

  const isFixturePassed = function(fixture) {
    return !fixture.failed && !fixture.skipped;
  };

  const results = {
    general: {
      user_agent: obj.userAgents[0],
      total_tests: getNumberOfTotalTests(),
      total_duration: formatTime(getTotalDuration(obj)),
      passed: obj.passed,
      failed: getNumberOfFailedTests(),
      skipped: obj.skipped
    },
    fixtures: []
  };

  for (let i = 0; i < fixtures.length; i++) {
    results.fixtures[i] = {};
    results.fixtures[i].name = fixtures[i].name;
    results.fixtures[i].path = fixtures[i].path;
    results.fixtures[i].tests = [];

    const tests = fixtures[i].tests;

    tests.forEach(function(test) {
      results.fixtures[i].tests.push({
        name: test.name,
        errs: test.errs,
        durationMs: formatTime(test.durationMs),
        screenshots: test.screenshots,
        skipped: test.skipped,
        passed: isTestPassed(test.skipped, test.errs),
        failed: isTestFailed(test.skipped, test.errs)
      });
    });

    results.fixtures[i].skipped = isFixtureSkipped(results.fixtures[i]);
    results.fixtures[i].failed = isFixtureFailed(results.fixtures[i]);
    results.fixtures[i].passed = isFixturePassed(results.fixtures[i]);
  }

  return results;
};
