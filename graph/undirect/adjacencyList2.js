// create a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices; // 노드 갯수
        this.AdjList = new Map(); // AdjList를 Map 객체로 구현
    }

    // add vertex to the graph
    addVertex(v)
    {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []); // set(key, value)
        // console.log('this.AdjList', this.AdjList) // { 'A' => [], 'B' => [], 'C' => [], 'D' => [], 'E' => [], 'F' => [] }
    }


    // add edge to the graph
    addEdge(v, w)
    {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        // console.log('this.AdjList.get(v)', this.AdjList.get(v)) // get 메서드는 뭐지?
        this.AdjList.get(v).push(w); // get(key)하면 배열 나오니 거기에 push

        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
    }

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
console.log('g', g)
// Graph {
//     noOfVertices: 6,
//         AdjList:
//     Map {
//         'A' => [ 'B', 'D', 'E' ],
//             'B' => [ 'A', 'C' ],
//             'C' => [ 'B', 'E', 'F' ],
//             'D' => [ 'A', 'E' ],
//             'E' => [ 'A', 'D', 'F', 'C' ],
//             'F' => [ 'E', 'C' ] } }



