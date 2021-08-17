// class Queue {
//     constructor() {
//         this.queue = [];
//     }
//     enqueue(data) {
//         this.queue.push(data);
//     }
//
//     dequeue() {
//         return this.queue.shift();
//     }
//
//     isEmpty() {
//         if (this.queue.length === 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// }


// Queue class
class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }

    enqueue(element)
    {
        // adding element to the queue
        this.items.push(element);
    }

    dequeue()
    {
        // removing element from the queue
        // returns underflow when called
        // on empty queue
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    front()
    {
        // returns the Front element of
        // the queue without removing it.
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // isEmpty function
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}


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
    // 시작 정점을 방문한 후 시작 정점에 인접한 모든 정점들을 우선 방문하는 방법
    // 사용하는 경우: 두 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 이 방법을 선택한다.
    // 이 알고리즘을 구현할 때 가장 큰 차이점은, 그래프 탐색의 경우 어떤 노드를 방문했었는지 여부를 반드시 검사 해야 한다는 것이다.
    // 이를 검사하지 않을 경우 무한루프에 빠질 위험이 있다.
    // 출처: https://gmlwjd9405.github.io/2018/08/15/algorithm-bfs.html
    bfs(startingNode)
    {
        // create a visited object
        const visited = {}; // 방문 여부를 체크하고 enqueue함.

        // Create an object for queue
        const q = new Queue(); //

        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);

        // loop until queue is element
        while (!q.isEmpty()) {
            // get the element from the queue
            let getQueueElement = q.dequeue(); // 해당 요소와 연결된 리스트를 구할 때 사용

            // passing the current vertex to callback function
            console.log('getQueueElement', getQueueElement); // 탐색한 값들

            // console.log('this.AdjList', this.AdjList)
            // get the adjacent list for current vertex
            let get_List = this.AdjList.get(getQueueElement); // 탐색한 값의 인접 리스트 구함
            console.log('get_List', get_List)

            // loop through the list and add the element to the
            // queue if it is not processed yet
            for (let i in get_List) {
                const neigh = get_List[i];

                if (!visited[neigh]) { // 인접 리스트 중 방문하지 않은 값은 방문 처리하고 큐에 넣는다.
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
        }
    }
    // dfs(v)
    // 루트 노드(혹은 다른 임의의 노드)에서 시작해서 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법
    // 즉, 넓게(wide) 탐색하기 전에 깊게(deep) 탐색하는 것이다.
    // 사용하는 경우: 모든 노드를 방문 하고자 하는 경우에 이 방법을 선택한다.
    // 출처: https://gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html
    // Main DFS method
    dfs(startingNode)
    {
        const visited = {};
        this.DFSUtil(startingNode, visited);
    }

// Recursive function which process and explore
// all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited)
    {
        visited[vert] = true;
        console.log(vert);
        // console.log('this.Adjust', this.AdjList)
        const get_neighbours = this.AdjList.get(vert); // 방문한 노드의 인접 노드를 방문하기 위함.

        for (const i in get_neighbours) {
            const get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.DFSUtil(get_elem, visited);
        }
    }
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
// g.printGraph();
// console.log('g', g)
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

// g.bfs('A'); // A-B-D-E-C-F
console.log("DFS");
g.dfs('A'); // A-B-C-E-D-F 왜?