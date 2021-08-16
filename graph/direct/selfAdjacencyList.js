class Graph {
    constructor() {
        this.numOfVertices = null;
        this.adList = new Map()
    }

    addVertex(vertex) {
        this.adList.set(vertex, []);
        this.numOfVertices++;
    }

    removeVertex(vertex) {
        this.adList.delete(vertex);
        this.numOfVertices--;
    }

    hasVertex(vertex) {
        return this.adList.has(vertex);
    }

    hasEdge(fromVertex, toVertex) {
        if (this.adList.get(fromVertex).includes(toVertex) || this.adList.get(toVertex).includes(fromVertex)) {
            return true;
        } else {
            return false;
        }
    }

    addEdge(fromVertex, toVertex) {
        if (!this.hasEdge(fromVertex, toVertex)) {
            this.adList.get(fromVertex).push(toVertex);
        }
    }

    removeEdge(fromVertex, toVertex) {
        if (this.hasEdge(fromVertex, toVertex)) {
            const fromVertexEdge = this.adList.get(fromVertex);
            const toVertexIndex = this.adList.get(fromVertex).indexOf(toVertex);
            fromVertexEdge.splice(toVertexIndex, 1);
        }
    }
}

const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.removeEdge(1, 3);
console.log('graph', graph)