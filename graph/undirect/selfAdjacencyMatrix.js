class Graph {
    constructor(numOfVertices) {
        // this.numOfVertices = numOfVertices; // 노드 갯수, 처음에 정하는 의미가 있나? 제한을 하나?
        this.numOfVertices = null; // 노드 갯수, 처음에 정하는 의미가 있나? 제한을 하나?
        this.AdjList = new Map();
    }

    // 노드 추가
    addVertex (v) {
        this.AdjList.set(v, []);
        this.numOfVertices++;
    }
    
    addEdge (fromVertex, toVertex) {
        if(this.hasEdge(fromVertex,toVertex)) {
            return;
        }
        this.AdjList.get(fromVertex).push(toVertex)
        this.AdjList.get(toVertex).push(fromVertex)
    }

    removeVertex (v) {
        const edges = this.AdjList.get(v)
        for (const fromVertex of edges) {
            this.removeEdge(fromVertex ,v)
        }
        console.log('this.AdjList', this.AdjList)
        this.AdjList.delete(v);
        this.numOfVertices--;
    }

    removeEdge (fromVertex, toVertex) {
        if(!this.hasEdge(fromVertex,toVertex)) {
            return;
        }
        const fromVertexIndex = this.AdjList.get(fromVertex).indexOf(toVertex);
        const toVertexIndex = this.AdjList.get(toVertex).indexOf(fromVertex);
        this.AdjList.get(fromVertex).splice(fromVertexIndex, 1);
        return this.AdjList.get(toVertex).splice(toVertexIndex, 1);
    }

    hasEdge (fromVertex, toVertex) {
        const fromVertexEdge = this.AdjList.get(fromVertex);
        if (fromVertexEdge.indexOf(toVertex) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    printGraph() {
        for (let [key, value] of this.AdjList) {
            console.log('key: ', key, 'value: ', value);
        }
    }
}

const graph = new Graph();
graph.addVertex(1)
graph.addVertex(2)
graph.addVertex(3)
graph.addVertex(4)
graph.addEdge(1,2)
graph.addEdge(2,3)
graph.addEdge(3,4)
// console.log('graph', graph)
// graph.printGraph();
// graph.removeEdge(1, 2)
graph.removeVertex(1)
console.log('graph', graph)
graph.printGraph()