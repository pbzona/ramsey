var millisecondsToHours = require('date-fns/millisecondsToHours');

class Flag {
  constructor(key, name, creationDate, temporary, tags) {
    this.name = name;
    this.key = key;
    this.creationDate = creationDate;
    this.temporary = temporary;
    this._lastRequested = null;
    this._status = null;
    this.tags = tags;
    this.priority = 0;
    this.codeRefs = 0;
  }

  set status(val) {
    if (val === 'inactive') {
      this.priority += 100;
    } else if (val === 'launched') {
      this.priority += 50;
    } else if (val === 'new') {
      this.priority += 20;

      let weeksSinceCreated = Math.floor(millisecondsToHours(now - val) / 168);
      this.priority += Math.pow(weeksSinceCreated, 2);
    }

    this._status = val;
  }

  get status() {
    return this._status;
  }

  set lastRequested(val) {
    const now = new Date();
    this._lastRequested = val;
    this.timeSinceLastRequested = Math.floor(
      millisecondsToHours(now - val) / 168
    ); // Number of weeks since last requested;
  }

  get lastRequested() {
    return this._lastRequested;
  }
}

module.exports = Flag;
