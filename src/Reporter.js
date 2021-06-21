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
}

module.exports = Reporter;