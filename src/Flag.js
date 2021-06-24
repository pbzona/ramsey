class Flag {
  constructor(key, name, creationDate, temporary) {
    this.name = name;
    this.key = key;
    this.creationDate = creationDate;
    this.temporary = temporary;
    this.lastRequested = null;
    this.status = null;
  }
}

module.exports = Flag;
