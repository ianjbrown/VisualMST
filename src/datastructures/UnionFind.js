class UnionFind {
  constructor(elements) {
    this.parent = {};
    for (const element of elements) {
      this.parent[element[0]] = element[0];
    }
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) return;

    if (rootA < rootB) {
      if (this.parent[b] !== b) this.union(this.parent[b], a);
      console.log(this.parent[b]);
      console.log(a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] !== a) this.union(this.parent[a], b);
      console.log(b);
      console.log(this.parent[a]);
      this.parent[a] = this.parent[b];
    }
  }

  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }

  toString() {
    return this.parent;
  }
}

export default UnionFind;
