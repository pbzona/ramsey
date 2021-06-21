var Table = require('cli-table');

class Reporter {
  constructor() {
    this.Table = Table;
  }

  static printOverview(data) {
    const table = new Table()
    table.push(
      {'Project': data.project},
      {'Total flags': data.flags}
    )

    console.log(table.toString())
  }

  static printEnvFlagStats(data) {
    const table = new Table({ 
      head: ['Flag Status', 'Count', '% of Total']
    });
    table.push(
      [...data.new],
      [...data.active],
      [...data.launched],
      [...data.inactive]
    );

    console.log('ENVIRONMENT STATUS REPORT:');
    console.log(table.toString());
  }

  static printRatios(data) {
    const table = new Table({
      head: ['Metric', 'Ratio']
    });
    table.push(...data);

    console.log('KEY RATIOS:')
    console.log(table.toString());
  }

  static printLongestSinceEvaluated(data) {
    const table = new Table({
      head: ['Flag key', 'Time since last evaluation']
    });
    table.push(...data);

    console.log('FLAGS BY TIME SINCE LAST EVALUATION:');
    console.log(table.toString());
  }
}

module.exports = Reporter;