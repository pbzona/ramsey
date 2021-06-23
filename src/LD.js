const LaunchDarklyApi = require('launchdarkly-api');

// Configure the client
const LDClient = LaunchDarklyApi.ApiClient.instance;
const Token = LDClient.authentications['Token'];
Token.apiKey = 'api-df97d0aa-2fb7-4ad3-863f-e1ded44abf54';

// Retrieve configuration options
const projectKey = process.env.LD_PROJECT_KEY;
const environmentKey = process.env.LD_ENVIRONMENT_KEY;

// Define the object to export
const ffApi = new LaunchDarklyApi.FeatureFlagsApi();

module.exports = {
  projectKey,
  environmentKey,
  FF: ffApi,
};
