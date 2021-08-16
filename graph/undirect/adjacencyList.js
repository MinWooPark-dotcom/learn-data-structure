// Undirected Graph를 인접 리스트(Adjacency list) 방식으로 구현
class Graph {
    constructor() {
        this.nodes = {};
    }

    addNode(node) {
        this.nodes[node] = this.nodes[node] || [];
    }

    contains(node) {
        let result;
        this.nodes[node] ? result = true : result = false;
        return result;
    }

    removeNode(node) {
        this.nodes[node] ? delete this.nodes[node] : this.nodes[node];
    }

    hasEdge(fromNode, toNode) {
        let result;
        this.nodes[fromNode] && this.nodes[toNode] && this.nodes[fromNode].includes(toNode) && this.nodes[toNode].includes(fromNode) ?
            result = true : result = false;
        return result
    }

    addEdge(fromNode, toNode) {
        this.nodes[fromNode].push(toNode);
        this.nodes[toNode].push(fromNode);
    }

    removeEdge(fromNode, toNode) {
        let node = this.nodes[fromNode];
        if (this.nodes[fromNode].includes(toNode) && this.nodes[toNode].includes(fromNode)) {
            this.nodes[fromNode].splice([node.indexOf(toNode)], 1);
            // toNode의 몇 번째 인덱스인지 알기 위해 node 변수에 재할당
            node = this.nodes[toNode];
            this.nodes[toNode].splice([node.indexOf(fromNode)], 1)
        }
    }
}

const graph = new Graph();
graph.addNode(1)
graph.addNode(2)
graph.addNode(3)
graph.addNode(4)
// console.log(graph.contains(1))
// console.log(graph.contains(3))
// graph.removeNode(2)
graph.addEdge(1,2)
graph.addEdge(2,3)
graph.addEdge(3,4)
graph.addEdge(4,1)
graph.addNode(1)
// console.log(graph.hasEdge(1,3))
// console.log(graph)
// graph.removeEdge(1,2)
// console.log(graph)