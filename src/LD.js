const LaunchDarklyApi = require('launchdarkly-api');

// Configure the client
const LDClient = LaunchDarklyApi.ApiClient.instance;
const Token = LDClient.authentications['Token'];
Token.apiKey = '';

// Retrieve configuration options
const projectKey = 'support-service';
const environmentKey = 'pzona';

// Define the object to export
const ffApi = new LaunchDarklyApi.FeatureFlagsApi();

module.exports = {
  projectKey,
  environmentKey,
  FF: ffApi,
};
