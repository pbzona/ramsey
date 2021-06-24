const LD = require('./src/LD');
const FlagProcessor = require('./src/FlagProcessor');
const populateSummary = require('./src/Summary');

// Configure the flag tracker
const Processor = new FlagProcessor({
  client: LD,
  project: LD.projectKey,
  environment: LD.environmentKey,
});

Processor.init();
