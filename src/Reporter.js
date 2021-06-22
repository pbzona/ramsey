const chalk = require('chalk');
const Table = require('cli-table');

class Reporter {
  constructor() {
    this.Table = Table;
  }

  static printOverview(data) {
    const table = new Table();
    table.push(
      { Project: data.project },
      { Environment: data.environment },
      { 'Total flags': data.flags }
    );

    printTableHeader('PROJECT SUMMARY');
    console.log(table.toString());
  }

  static printEnvFlagStats(data) {
    const table = new Table({
      head: ['Flag Status', 'Count', '% of Total'],
    });
    table.push(
      [...data.new],
      [...data.active],
      [...data.launched],
      [...data.inactive]
    );

    printTableHeader('ENVIRONMENT STATUS REPORT');
    console.log(table.toString());
  }

  static printRatios(data) {
    const table = new Table({
      head: ['Metric', 'Ratio'],
    });
    table.push(...data);

    printTableHeader('STATUS RATIOS');
    console.log(table.toString());
  }

  static printLongestSinceEvaluated(data) {
    const table = new Table({
      head: ['Flag key', 'Time since last evaluation'],
    });
    table.push(...data);

    printTableHeader('FLAGS BY TIME SINCE LAST EVALUATION');
    console.log(table.toString());
  }
}

function printTableHeader(text) {
  console.log(chalk.green(text));
}

module.exports = Reporter;
