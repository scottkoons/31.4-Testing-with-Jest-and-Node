/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Loop over the words array & make each word a key.

    for (let i = 0; i < this.words.length; i++) {
      if (this.chains[this.words[i]]) {
        let chainedWords = this.chains[this.words[i]];
        if (this.words[i + 1]) {
          chainedWords.push(this.words[i + 1]);
        } else {
          chainedWords.push(null);
        }
        this.chains[this.words[i]] = chainedWords;

      } else {
        let newChainedWords = [];
        if (this.words[i + 1]) {
          newChainedWords.push(this.words[i + 1]);
        } else {
          newChainedWords.push(null);
        }
        this.chains[this.words[i]] = newChainedWords;
      }
    }

  }


  /** return random text from chains */

  makeText(numWords = 50) {
    let newText = "";
    // Start with a random word from the array
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    newText = newText + word + " ";
    for (let i = 0; i < numWords; i++) {
      if (this.chains[word][0] == null) {
        return newText;
      } else {
        word = this.chains[word][Math.floor(Math.random() * this.chains[word].length)];
        newText = newText + word + " ";
      }
    }

    return newText;
  }
}

module.exports = { MarkovMachine };