const classNameAlphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let counters = [-1];

function countersToString() {
  return counters.map((counter) => classNameAlphabet[counter]).join("");
}

function getNextClassName() {
  const length = counters.length;

  for (let i = length - 1; i >= 0; i--) {
    if (counters[i] < classNameAlphabet.length - 1) {
      counters[i] += 1;
      return countersToString();
    }
    counters[i] = 0;
    if (i === 0) {
      counters.push(0);
      return countersToString();
    } else {
      counters[i - 1] += 1;
    }
  }
}

const classes = {};

/**
 * @param {Object} context
 * @param {string} context.resourcePath
 * @param {string} context.resourceQuery
 * @param {string} localName
 */
function getLocalIdent(context, _, localName) {
  let identifier = context.resourcePath;
  if (context.resourceQuery) {
    const { path } = JSON.parse(context.resourceQuery.slice(1));
    identifier = path;
  }
  classes[identifier] ||= {};
  classes[identifier][localName] ||= getNextClassName();
  return classes[identifier][localName];
}

module.exports = getLocalIdent;
