const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonDir: 'dist/features',
    output: 'dist/features/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    name: 'eShop',
    brandTitle: 'iSwish'
};

reporter.generate(options);
