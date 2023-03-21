const classNameAlphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Generator {
  alphabet = classNameAlphabet;
  counters = [];

  next() {
    return this.increment().countersToString();
  }

  countersToString() {
    return this.counters.map((counter) => this.alphabet[counter]).join("");
  }

  increment() {
    const length = this.counters.length;
    const lastDigit = this.alphabet.length - 1;

    for (let i = 0; i < length; i++) {
      if (this.counters[i] < lastDigit) {
        if (i === 0) {
          const next = this.counters[i] + 1;
          if (next !== -1) {
            this.counters[i] = next;
            return this;
          } else if (i < length - 1) {
            this.counters[i] = 0;
          }
        } else {
          ++this.counters[i];
          return this;
        }
      } else if (i < length - 1) {
        this.counters[i] = 0;
      }
    }

    this.counters = Array(length + 1).fill(0);

    return this;
  }
}

module.exports.getLocalIdentName = () => {
  const classes = {};
  const classNameGenerator = new Generator();
  const generateNextClassname =
    classNameGenerator.next.bind(classNameGenerator);

  /**
   * @param {Object} context
   * @param {string} context.resourcePath
   * @param {string} context.resourceQuery
   * @param {string} localName
   */
  return (context, _, localName) => {
    let identifier = context.resourcePath;
    if (context.resourceQuery) {
      const { path } = JSON.parse(context.resourceQuery.slice(1));
      identifier = path;
    }
    classes[identifier] ||= {};
    classes[identifier][localName] ||= generateNextClassname();
    return classes[identifier][localName];
  };
};
