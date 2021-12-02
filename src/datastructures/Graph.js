import { Random } from "random-js";
import PriorityQueue from "./PriorityQueue.js";
import UnionFind from "./UnionFind.js";
// create a graph class
class Graph {
  // constructor
  // initialize no of vertices at 0 and adjacencylist as an empty map
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  setNoOfVertices(noOfVertices) {
    this.noOfVertices = noOfVertices;
  }

  // adds vertex v and map to a null array
  addVertex(v) {
    this.AdjList.set(v, []);
    //this.state.noOfVertices += 1;
  }

  // add edge to each others adjacency lists since undirected graph
  addEdge(u, v, weight) {
    let uAdjList = this.AdjList.get(u);
    let vAdjList = this.AdjList.get(v);

    if (uAdjList === undefined || vAdjList === undefined) return false;
    // no duplicate edges
    for (var i in uAdjList) if (uAdjList[i].node === v) return false;

    // no self-connecting edges
    if (u === v) return false;
    // undirected graph so push onto both
    // if (uAdjList === undefined)
    // console.log(uAdjList.size);
    // console.log(vAdjList);
    uAdjList.push({
      node: v,
      weight: weight,
    });
    vAdjList.push({
      node: u,
      weight: weight,
    });
    return true;
  }

  /* this is really just a depth first search that returns
    true if we can visit all vertices (graph is connected)*/
  isConnected(startingNode) {
    var visited = {};
    this.isConnectedUtil(startingNode, visited);
    // console.log(visited);
    // console.log(Object.keys(visited));
    if (Object.keys(visited).length < this.noOfVertices) {
      return false;
    } else {
      return true;
    }
  }

  // recursive function for above
  isConnectedUtil(vert, visited) {
    visited[vert] = true;

    var get_neighbours = this.AdjList.get(vert);
    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i].node;
      if (!visited[get_elem]) {
        this.isConnectedUtil(get_elem, visited);
      }
    }
  }

  toString() {
    // get all vertices
    var get_keys = this.AdjList.keys();

    var outerConc = [];
    var edgeCount = 0;
    // iterate over vertices
    for (var i of get_keys) {
      // get corresponsing adjacency list
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over adjacency list
      // concatenate the values into a string
      for (var j of get_values) {
        conc += "{ node = " + j.node + ", weight = " + j.weight + "}";
        edgeCount++;
      }

      // print the vertex and its adjacency list
      outerConc.push(i + " -> " + conc);
    }
    outerConc.push(
      "This Graph has " +
        this.noOfVertices +
        " vertices and " +
        edgeCount / 2 +
        " edges"
    );
    if (edgeCount / 2 === this.noOfVertices - 1) {
      outerConc.push(
        "This Graph is an MST because it has n-1 (" + edgeCount / 2 + ") edges"
      );
    }
    //console.log(this.AdjList);
    return outerConc;
  }

  generateGraph() {
    const random = new Random();
    let edges = 0;

    this.AdjList.clear();

    //Add the vertices
    for (var i = 0; i < this.noOfVertices; i++) {
      this.addVertex(i);
    }

    //Add edges until we have a connected graph
    while (!this.isConnected(0)) {
      //const edges = random.integer(1,)
      let added = this.addEdge(
        random.integer(0, this.noOfVertices - 1),
        random.integer(0, this.noOfVertices - 1),
        random.integer(1, 30)
      );
      if (added) edges++;
    }

    // add a random amount of more edges to allow for more than one MST
    let moreEdges = random.integer(
      edges + 1,
      0.25 * this.noOfVertices * (this.noOfVertices - 1)
    );
    while (edges < moreEdges) {
      let wasAdded = this.addEdge(
        random.integer(0, this.noOfVertices - 1),
        random.integer(0, this.noOfVertices - 1),
        random.integer(1, 30)
      );
      if (wasAdded) edges++;
    }
  }

  importGraph(lines) {
    //add the vertices
    for (var i = 0; i < this.noOfVertices; i++) {
      this.addVertex(i);
    }

    //add the edges
    for (i = 0; i < lines.length; i++) {
      this.addEdge(
        parseInt(lines[i][0]),
        parseInt(lines[i][2]),
        parseInt(lines[i][4])
      );
    }
  }

  kruskal() {
    // Create new graph for MST and priority queue for edges sorted by weight
    // create union-find/disjoint-sets data structure to help check for introduction of cycles
    var edgeSequence = [];
    const MST = new Graph(this.noOfVertices);
    var edgesQueue = new PriorityQueue();
    let uf = new UnionFind(this.AdjList);

    // Add vertices to MST
    for (var i = 0; i < this.noOfVertices; i++) {
      MST.addVertex(i);
    }
    MST.setNoOfVertices(MST.AdjList.size);
    // Add edges to priority queue
    for (const element of this.AdjList) {
      for (const adjacent of element[1]) {
        edgesQueue.enqueue([element[0], adjacent.node], adjacent.weight);
      }
    }

    while (!edgesQueue.isEmpty()) {
      const nextEdge = edgesQueue.dequeue();
      const vertices = nextEdge.elem;
      const weight = nextEdge.prio;

      //if adding edge would not create cycle, add edge to MST
      if (!uf.connected(vertices[0], vertices[1])) {
        MST.addEdge(vertices[0], vertices[1], weight);
        console.log(JSON.parse(JSON.stringify(uf)));
        uf.union(vertices[0], vertices[1]);
        edgeSequence.push([vertices[0],vertices[1], weight])
      }
    }
    console.log(JSON.parse(JSON.stringify(uf)));
    console.log(edgeSequence);
    return [MST, edgeSequence];
  }

  prim(startingVertex) {
    var startingVertex = parseInt(startingVertex);
    /* create data structures... new graph for MST, 
    queue for edges sorted by weight, and array of visited vertices */
    var edgeSequence = [];
    const MST = new Graph(this.noOfVertices);
    var edgesQueue = new PriorityQueue();
    var visited = [];

    //begin with first node (0)
    visited.push(startingVertex);
    MST.addVertex(startingVertex);
    console.log(startingVertex);
    console.log(this.AdjList);
    // add edges of the starting node to queue
    for (const adjacent of this.AdjList.get(parseInt(startingVertex))) {
      edgesQueue.enqueue([startingVertex, adjacent.node], adjacent.weight);
    }
    console.log("EDGES QUEUE = " + JSON.stringify(edgesQueue));
    // while we have not visited all vertices
    while (visited.length < this.noOfVertices) {
      // pick edge with the lowest weight
      let nextEdge = edgesQueue.dequeue();

      // the connected vertex
      let nextNode = nextEdge.elem[1];

      // if not visited yet, add to MST
      if (!visited.includes(nextNode)) {
        MST.addVertex(nextNode);
        MST.addEdge(nextEdge.elem[0], nextNode, nextEdge.prio);
        edgeSequence.push([nextEdge.elem[0], nextNode, nextEdge.prio]);

        // add edges of new node to queue
        for (const adjacent of this.AdjList.get(nextNode)) {
          edgesQueue.enqueue([nextNode, adjacent.node], adjacent.weight);
        }

        // mark as visited
        visited.push(nextNode);
      }
      MST.setNoOfVertices(MST.AdjList.size);
    }
    return [MST, edgeSequence];
  }

  // this helper function allows us to sort adjlists by numerical node value
  compareAdjListEntry(x, y) {
    if (x.node < y.node) {
      return -1;
    }
    if (x.node > y.node) {
      return 1;
    }
    return 0;
  }

  compareObjects(x, y) {
    for (var property in x) {
      if (x[property] !== y[property]) {
        return false;
      }
    }
    return true;
  }

  compareAdjLists(kruskalList, primList) {
    var testVal;
    if (kruskalList.size !== primList.size) {
      return false;
    }
    for (var [key, val] of kruskalList) {
      testVal = primList.get(key);
      if (!primList.has(key) || testVal.length !== val.length) {
        return false;
      }
      val.sort(this.compareAdjListEntry);
      testVal.sort(this.compareAdjListEntry);

      for (var i = 0; i < val.length; i++) {
        if (!this.compareObjects(val[i], testVal[i])) {
          return false;
        }
      }
    }
    return true;
  }

  testAlgorithms(testNumber) {
    const random = new Random();
    var passedTests = 0;
    var printCounter = 0;
    for (var test = 0; test < testNumber; test++, printCounter++) {
      if (printCounter === testNumber / 10) {
        console.log("Beginning test " + test);
        printCounter = 0;
      }
      if (printCounter === testNumber / 20) console.log("...");
      //var v = random.integer(5, 15);
      //this.setNoOfVertices(v);
      this.generateGraph();
      //console.log(this.toString());
      var kruskal = this.kruskal();
      var prim = this.prim();
      if (this.compareAdjLists(kruskal.AdjList, prim.AdjList)) {
        passedTests++;
      }
    }
    console.log(passedTests + " matches");
    console.log(testNumber - passedTests + " differences");
    console.log("Match rate of " + (passedTests / testNumber) * 100 + "%");
  }
}
export default Graph;
