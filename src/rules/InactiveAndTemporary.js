const Rule = require('./Rule');

function inactiveAndTemporary(flag) {
  return flag.status === 'inactive' && flag.temporary === true;
}

const InactiveAndTemporaryRule = new Rule(inactiveAndTemporary);

module.exports = InactiveAndTemporaryRule;
