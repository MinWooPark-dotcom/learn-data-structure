class Graph {
    constructor() {
        this.nodes = {}; // { vertex: [connected vertex, connected vertex, ...], vertex: [connected vertex, connected vertex, ...] ,.. }
        this.size = null;
    }

    insertNode(data) {
        // 존재하지 않는 노드라면
         if (!this.nodes[data]) {
             this.nodes[data] = []; // nodes에 키로 넣음. 값은 edge로 연결된 vertex를 담음
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
        // includes(): return true or false
        if (this.nodes[fromNode].includes(toNode) && this.nodes[toNode].includes(fromNode)) {
            return true;
        } else {
            return false
        }
    }

    hasManyEdge() {
        let edgeNum = 0;
        // 인전 리스트 전체 조사
        // 중복된 간선 갯수 제거하기 위해 간선 갯수만큼 순회
        // nodes를 순회하면서 각 키들을 담아둠. => keys
        // nodes의 값에 keys의 값을 제외하고 edgeNum++
        let keys = [];
        // console.log('this.nodes', this.nodes)
        for (const node in this.nodes) {
            // console.log('node', node) // key
            // console.log('this.nodes[node]', this.nodes[node]); // value
            for (const key of keys) {
                if (this.nodes[node].indexOf(key) !== -1) {
                    edgeNum++;
                }
            }
            keys.push(Number(node));
        }
        return edgeNum;
    }

    connectEdge(fromNode, toNode) {
        if(this.hasEdge(fromNode, toNode)) {
            return;
        }
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
graph.insertNode(4)
// console.log('graph.contains(1)', graph.contains(1)) // true
graph.connectEdge(1, 2);
graph.connectEdge(2, 3);
graph.connectEdge(4, 1);
graph.connectEdge(4, 2);
graph.connectEdge(4, 3);
// graph.connectEdge(2, 3);
// console.log('graph.hasEdge(1,2)', graph.hasEdge(1, 2)); // true
// console.log('graph.hasEdge(2,1)', graph.hasEdge(2, 1)); // true
// graph.removeEdge(1,2)
// graph.removeEdge(2,3)
console.log('graph', graph); // graph Graph { nodes: { '1': [ 2 ], '2': [ 1, 3 ], '3': [ 2 ] }, size: 3 }
console.log('graph.hasManyEdge', graph.hasManyEdge());