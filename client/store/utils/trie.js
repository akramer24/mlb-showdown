class Trie {
  constructor() {
    this.children = {};
    this.dataObjects = [];
  }
  
  add(string, player) {
    let node = this;
    string = string.toLowerCase();
    for (let i = 0; i < string.length; i++) {
      let letter = string[i];
      
      if (!node.children[letter]) {
        node.children[letter] = new Trie();
      }
      node = node.children[letter];
      if (i > 1) node.dataObjects.push(player);
    }
  }

  buildTrie(array) {
    for (let i = 0; i < array.length; i++) {
      let player = array[i];
      this.add(player.name, player);
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
    return node.dataObjects;
  }
}

// const players = [{"name":"Bobby Abreu","id":48,"firstName":"Bobby","lastName":"Abreu","year":2002,"superSeason":false,"allStar":false,"onBase":11,"SO":[1,2,3],"GB":[4],"FB":[5,6]}]
// const trie = new Trie();
// trie.buildTrie(players);
// console.log(trie.searchFor('bobby abreu'))

export default Trie;