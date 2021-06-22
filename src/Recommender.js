class Recommender {
  // Compile a list of flags to be reviewed
  // Get data for each flag (individual api call)
  // Show:
  // - Status
  // - If active in any environments
  // - Maintainer
  // - What we recommend doing to the flag (promoting or archiving)
  constructor() {
    this.flags = [];
  }

  addFlag(f) {
    this.flags.push(f);
  }
}
