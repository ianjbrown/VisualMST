import { Random } from "random-js";
// create a graph class
class Graph {
    // constructor
    // initialize no of vertices at 0 and adjacencylist as an empty map
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    };
    
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

        // no duplicate edges
        for (var i in uAdjList) if (uAdjList[i].node === v) return false;
        
        // no self-connecting edges
        if (u === v) return false;

        // undirected graph so push onto both
        uAdjList.push({
            node: v,
            weight: weight
        })
        vAdjList.push({
            node: u,
            weight: weight
        })
        return true;
    }
    
    /* this is really just a depth first search that returns
    true if we can visit all vertices (graph is connected)*/
    isConnected(startingNode) {
        var visited = {};
        this.isConnectedUtil(startingNode, visited);
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
        // iterate over vertices
        for (var i of get_keys) {

            // get corresponsing adjacency list
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over adjacency list
            // concatenate the values into a string
            for (var j of get_values) {
                conc += "{ node = " + j.node + ", weight = " + j.weight + "}";
            }

            // print the vertex and its adjacency list
            outerConc.push(i + " -> " + conc);
        }
        console.log(this.AdjList);
        return outerConc;
        
    }

    generateGraph() {
        const random = new Random();
        let edges = 0;

        //Add the vertices
        for (var i = 0; i < this.noOfVertices; i++) {
            this.addVertex(i);
        }

        //Add edges until we have a connected graph
        while (!this.isConnected(0)) {
            //const edges = random.integer(1,)
            let added = this.addEdge(random.integer(0,this.noOfVertices - 1), random.integer(0,this.noOfVertices - 1), random.integer(1, 10));
            if (added) edges++;
        }   

        //add a random amount of more edges to allow for more than one MST
        let moreEdges = random.integer(edges, (this.noOfVertices * ((this.noOfVertices - 1) / 2)));
        while (edges < moreEdges) {
            let wasAdded = this.addEdge(random.integer(0,this.noOfVertices - 1), random.integer(0,this.noOfVertices - 1), random.integer(1, 10));
            if (wasAdded) edges++;
        }
    }
    
}
export default Graph;