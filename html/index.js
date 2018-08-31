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

      // this.write(html);

      const dir = process.env.REPORT_PATH || `${__dirname}../../reports`;

      if (!fs.existsSync(dir)) {
        let dirName = "";
        const filePathSplit = dir.split("/");
        for (let index = 0; index < filePathSplit.length; index++) {
          dirName += filePathSplit[index] + "/";
          if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
        }
      }

      const d = new Date();
      const timestamp =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        "_" +
        d.getHours() +
        "-" +
        d.getMinutes() +
        "-" +
        d.getSeconds();

      let filename = `${timestamp}.html`;

      if (typeof process.env.REPORT_NAME !== "undefined") {
        filename = `${process.env.REPORT_NAME}.html`;
      }

      const file = `${dir}/${filename}`;

      console.log(file);
      fs.writeFileSync(file, html);
    }
  };
};
