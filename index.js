require('dotenv').config()
const LaunchDarklyApi = require('launchdarkly-api');
const FlagStatusTracker = require('./FlagStatusTracker');

// Configure the client
const LDClient = LaunchDarklyApi.ApiClient.instance;

const Token = LDClient.authentications['Token'];
Token.apiKey = process.env.LD_API_KEY;

const apiInstance = new LaunchDarklyApi.FeatureFlagsApi();

const projectKey = process.env.LD_PROJECT_KEY;
const environmentKey = process.env.LD_ENVIRONMENT_KEY;

// Configure the flag tracker
const Tracker = new FlagStatusTracker();

var callback = function(error, data) {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    //console.log(JSON.stringify(data));
    Tracker.processFlags(data)
    Tracker.printSummary();
    Tracker.printRatios();
    Tracker.printTimeSinceLastRequest(10); //Configure number of results to show here
  }
};

apiInstance.getFeatureFlagStatuses(projectKey, environmentKey, callback);
