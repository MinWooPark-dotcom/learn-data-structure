class Graph {
    constructor() {
        this.nodes = {};
        this.size = null;
    }

    insertNode(data) {
        // 존재하지 않는 노드라면
         if (!this.nodes[data]) {
             this.nodes[data] = [];
             return this.size++;
        }
        return;
    }

    // graph에 node가 있는지 체크
    contains(node) {
        return this.nodes[node] ? true : false;
    }

    // node간의 edge가 있는지 확인
    hasEdge(fromNode, toNode) {
        if (this.nodes[fromNode].includes(toNode) && this.nodes[toNode].includes(fromNode)) {
            return true;
        } else {
            return false
        }
    }

    connectEdge(fromNode, toNode) {
        this.hasEdge(fromNode, toNode);
        this.nodes[fromNode].push(toNode);
        return this.nodes[toNode].push(fromNode);
    }

    removeEdge(fromNode, toNode) {
        this.hasEdge(fromNode, toNode);
        // node의 몇 번째에 위치하는지 체크
        const indexOfToNode = this.nodes[fromNode].indexOf(toNode);
        const indexOfFromNode = this.nodes[toNode].indexOf(fromNode);
        console.log('indexOfToNode', indexOfToNode) // 1
        console.log('indexOfFromNode', indexOfFromNode) // 0
        this.nodes[fromNode].splice(indexOfToNode, 1);
        return this.nodes[toNode].splice(indexOfFromNode, 1);
    }
}


const graph = new Graph();
graph.insertNode(1)
graph.insertNode(2)
graph.insertNode(3)
// console.log('graph.contains(1)', graph.contains(1)) // true
graph.connectEdge(1, 2);
graph.connectEdge(2, 3);
// console.log('graph.hasEdge(1,2)', graph.hasEdge(1, 2)); // true
// console.log('graph.hasEdge(2,1)', graph.hasEdge(2, 1)); // true
graph.removeEdge(1,2)
// graph.removeEdge(2,3)
console.log('graph', graph);