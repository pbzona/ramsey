const LD = require('./src/LD');
const FlagProcessor = require('./src/FlagProcessor');
// const populateSummary = require('./src/Summary');
const PriorityController = require('./src/PriorityController');

// Configure the flag tracker
const Processor = new FlagProcessor({
  client: LD,
  project: LD.projectKey,
  environment: LD.environmentKey,
});

Processor.init();

// let Prioritizer;

// while (!Processor.checkReadiness()) {
//   try {
//     Prioritizer = new PriorityController(Processor.getFlagList());
//   } catch (err) {
//     console.error(err);
//   }
// }
