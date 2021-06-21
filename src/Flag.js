class Flag {
  constructor(key, lastRequested, status) {
    this.key = key;
    this.lastRequested = lastRequested;
    this.status = status;
  }
}

module.exports = Flag;