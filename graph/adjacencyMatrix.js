// create a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices; // to store the number of vertices in the graph and AdjList, which stores a adjacency list of a particular vertex.
        this.AdjList = new Map(); // We used a Map Object provided by ES6 in order to implement Adjacency list.
        // console.log('this.AdjList', this.AdjList)
    }

    // functions to be implemented

    // addVertex(v)
    // add vertex to the graph
    addVertex(v)
    {
        // initialize the adjacent list with a
        // null array
        // console.log('v', v) // A, B, C, D, E, F
        this.AdjList.set(v, []);
        // console.log('this.AdjList', this.AdjList) // { 'A' => [], 'B' => [], 'C' => [], 'D' => [], 'E' => [], 'F' => [] }
    }

    // addEdge(v, w)
    // add edge to the graph
    addEdge(v, w)
    {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        // console.log('this.AdjList.get(v)', this.AdjList.get(v)) // get 메서드는 뭐지?
        this.AdjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
    }
    // printGraph()
// Prints the vertex and adjacency list
    printGraph()
    {
        // get all the vertices
        const get_keys = this.AdjList.keys();
        // console.log('this.AdjList', this.AdjList)
        //Map {
        //   'A' => [ 'B', 'D', 'E' ],
        //   'B' => [ 'A', 'C' ],
        //   'C' => [ 'B', 'E', 'F' ],
        //   'D' => [ 'A', 'E' ],
        //   'E' => [ 'A', 'D', 'F', 'C' ],
        //   'F' => [ 'E', 'C' ] }
        // console.log('get_keys', get_keys) // [Map Iterator] { 'A', 'B', 'C', 'D', 'E', 'F' }
        // iterate over the vertices
        for (let i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            const get_values = this.AdjList.get(i);
            console.log('get_values', get_values)
            let conc = "";

            // iterate over the adjacency list
            // concatenate(사슬같이 잇다) the values into a string
            for (let j of get_values)
                conc += j + " "; // " " 띄어쓰기로 각 value를 구분

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
    // bfs(v)
    // dfs(v)
}

// Using the above implemented graph class
const g = new Graph(6);
const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

// adding vertices
for (let i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

// adding edges
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
g.printGraph();



