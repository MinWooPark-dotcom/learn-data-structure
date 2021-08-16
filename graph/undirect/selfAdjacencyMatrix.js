class Graph {
    constructor() {
        this.matrix = null;
        this.nodes = [];
        this.numOfNodes = null;
    }

    addNode(vertex) {
        // 맨 처음 노드 생성 시
        if (!this.matrix) {
            // this.matrix = new Array(1).fill(0) //[0]를 map해서 0을 [0]으로 만듬 => [[0]]
            this.matrix = new Array(1).fill(0).map((row) => new Array(1).fill(0))
        } else {
            // 행 추가
            this.matrix.push(new Array(this.matrix.length).fill(0))
            // 열 추가
            for (const row of this.matrix) {
                row.push(0);
            }
        }
        this.numOfNodes++;
        return this.nodes.push(vertex)
    }

    hasEdge(fromVertex, toVertex) {
        // console.log(this.nodes)
        const fromIndex = this.nodes.indexOf(fromVertex); // 0
        const toIndex = this.nodes.indexOf(toVertex); // 1
        if (fromIndex === -1 || toIndex === -1 || this.matrix[fromIndex][toIndex] !== 1 && this.matrix[toIndex][fromIndex] !== 1) {
            return false;
        } else {
            return true;
        }
    }

    addEdge(fromVertex, toVertex) {
        // matrix: [ [ 0, 0 ], [ 0, 0 ] ]
        if (this.hasEdge(fromVertex, toVertex)) {
            return;
        }
        const fromIndex = this.nodes.indexOf(fromVertex); // 0
        const toIndex = this.nodes.indexOf(toVertex); // 1
        this.matrix[fromIndex][toIndex] = 1;
        this.matrix[toIndex][fromIndex] = 1;
    }

    removeEdge(fromVertex, toVertex) {
        if (!this.hasEdge(fromVertex, toVertex)) {
            return;
        }
        const fromIndex = this.nodes.indexOf(fromVertex); // 0
        const toIndex = this.nodes.indexOf(toVertex); // 1
        this.matrix[fromIndex][toIndex] = 0;
        this.matrix[toIndex][fromIndex] = 0;
    }

    // vertex의 행 또는 열을 모두 더하여 정점의 차수를 알 수 있음.
    countEdge(vertex) {
        let count = 0;
        const vertexIndex = this.nodes.indexOf(vertex);
        if (vertexIndex !== -1) {
            for (const row of this.matrix) {
                console.log('row', row)
                count = count + row[vertexIndex];
            }
            return count;
        }
    }
}

const graph = new Graph();
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addEdge(1,2)
graph.addEdge(1,3)
// graph.removeEdge(1,2)
console.log('graph', graph)
console.log('graph.countEdge(1)', graph.countEdge(1))
