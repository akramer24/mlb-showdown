class Trie {
  constructor() {
    this.children = {};
    this.names = [];
    this.isEndOfWord = false;
  }

  add(player) {
    let node = this;
    const name = player.name.toLowerCase();
    for (let i = 0; i < name.length; i++) {
      let letter = name[i];
      if (!node.children[letter]) {
        node.children[letter] = new Trie();
      }
      node = node.children[letter];
      if (i > 1) node.names.push(player.name);
      if (i === name.length - 1) node.isEndOfWord = true;
    }
  }

  buildTrie(array) {
    for (let i = 0; i < array.length; i++) {
      let player = array[i];
      this.add(player);
    }
    return this;
  }

  searchFor(string) {
    let node = this;
    let idx = 0;
    string = string.toLowerCase();
    while (string[idx]) {
      let letter = string[idx];
      if (!node.children[letter]) {
        return [];
      } else {
        node = node.children[letter];
        idx++;
      }
    }
    return node.names;
  }
}

// const players = [{"name":"Bobby Abreu","id":48,"firstName":"Bobby","lastName":"Abreu","year":2002,"superSeason":false,"allStar":false,"onBase":11,"SO":[1,2,3],"GB":[4],"FB":[5,6]}]
// const trie = new Trie();
// trie.buildTrie(players);
// console.log(trie.searchFor('bobby abreu'))

export default Trie;