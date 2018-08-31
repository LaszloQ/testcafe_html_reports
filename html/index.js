const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const transformer = require("./utils/transformer");

module.exports = function() {
  return {
    noColors: true,
    currentFixture: null,

    report: {
      startTime: null,
      endTime: null,
      userAgents: null,
      passed: 0,
      total: 0,
      skipped: 0,
      fixtures: [],
      warnings: []
    },

    reportTaskStart(startTime, userAgents, testCount) {
      this.report.startTime = startTime;
      this.report.userAgents = userAgents;
      this.report.total = testCount;
    },

    reportFixtureStart(name, fixturePath) {
      this.currentFixture = { name, path: fixturePath, tests: [] };
      this.report.fixtures.push(this.currentFixture);
    },

    reportTestDone(name, testRunInfo) {
      var errs = testRunInfo.errs.map(err => this.formatError(err));

      if (testRunInfo.skipped) this.report.skipped++;

      this.currentFixture.tests.push({
        name,
        errs,
        durationMs: testRunInfo.durationMs,
        unstable: testRunInfo.unstable,
        screenshots: testRunInfo.screenshots,
        skipped: testRunInfo.skipped
      });
    },

    reportTaskDone(endTime, passed, warnings) {
      this.report.passed = passed;
      this.report.endTime = endTime;
      this.report.warnings = warnings;

      const source = fs.readFileSync(
        path.join(__dirname, "index.hbs"),
        "utf-8"
      );
      const template = handlebars.compile(source);
      const reportObj = transformer(this.report);
      const html = template(reportObj);

      this.write(html);
    }
  };
};
