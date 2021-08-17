class Graph {
    constructor() {
        this.matrix = [[]]; // 그래프를 구현할 2차원 행렬, graph가 생성되면 vertex가 없어도 형태는 있어야 하니까 초기화 시 할
        this.numOfVertices = null; // vertex의 수
        this.vertices = []; // 행렬만으로는 vertex의 값을 알 수 없으므로 따로 저장
    }

    addVertex(v) {
        if(this.hasVertex(v)) {
            return;
        }
        // vertex가 없을 떄
        if (this.matrix[0].length === 0) {
            this.matrix[0].push(0);
        }
        // vertex가 있을 때
        else {
            // 현재 행과 같은 길이로 행 추가
            this.matrix.push(new Array(this.matrix.length).fill(0))
            // 모든 행(배열)에 인자 추가하여 열 추가
            for (const row of this.matrix) {
                row.push(0);
            }
        }
        this.numOfVertices++;
        return this.vertices.push(v);
    }

    addEdge(fromVertex, toVertex) {
        // 행렬로 표현하면 fromVertex가 row, toVertex가 column이 됨.
        // this.matrix[row][column]으로 접근 가능
        if (this.hasEdge(fromVertex, toVertex)) {
            return;
        } else if (this.hasVertex(fromVertex) && this.hasVertex(toVertex)) {
            const fromVertexIndex = this.vertices.indexOf(fromVertex);
            const toVertexIndex = this.vertices.indexOf(toVertex);
            return this.matrix[fromVertexIndex][toVertexIndex] = 1;
        }
    }

    hasVertex(v) {
        if (this.vertices.includes(v)) {
            return true;
        } else {
            return false;
        }
    }


    hasEdge(fromVertex, toVertex) {
        // this.matrix[row][column]이 0 or 1로 확인 가능
        const fromVertexIndex = this.vertices.indexOf(fromVertex);
        const toVertexIndex = this.vertices.indexOf(toVertex);
        if (this.matrix[fromVertexIndex][toVertexIndex] === 1) {
            return true;
        } else {
            return false;
        }
    }

    removeVertex(v) {
        // this.matrix에서 행과 열 한 개씩 삭제
        if (!this.hasVertex(v)) {
            return;
        }
        // edge 제거
        // 1. v랑 연결된 v들을 다 찾기
        const vertexIndex = this.vertices.indexOf(v); // 행렬에서 몇 번째 인지 찾음
        // const connectedVertex = []; // 제거할 v를 direct한 vertex를 찾음
        let countRow = 0; // 연결된 행을 카운트해서 이 값으로 this.vertex[countRow]로 vertex의 값을 찾음

        // direct 당한 경우: 행 수정
        for (const row of this.matrix) {
            if (row[vertexIndex] === 1) {
                // connectedVertex.push(this.vertices[countRow]);
                // row[vertexIndex] = 0;
                this.matrix[countRow][vertexIndex] = 0;
            }
            countRow++;
        }
        // direct 한 경우: 열 수정
        let index = 0;
        for (const column of this.matrix[vertexIndex]) {
            // console.log('column', column) // 0, 1, 0
            if (column === 1) {
                this.matrix[vertexIndex][index] = 0;
            }
            index++;
        }
        // vertex 열 제거
        for (const row of this.matrix) {
            row.splice(vertexIndex, 1);
        }
        // vertex 행 제거
        this.matrix.splice(vertexIndex, 1);
        this.vertices = this.vertices.filter((el) => el !== v);
        this.numOfVertices--;
    }

    removeEdge(fromVertex, toVertex) {
        if (this.hasEdge(fromVertex, toVertex)) {
            const fromVertexIndex = this.vertices.indexOf(fromVertex);
            const toVertexIndex = this.vertices.indexOf(toVertex);
            this.matrix[fromVertexIndex][toVertexIndex] = 0;
        }
    }

    // v가 연결한 edge 카운트
    countEdge(v) {
        // matrix 모두 순회해서 값이 1인 갯수를 리턴
        if (!this.hasVertex(v)) {
            return;
        }
        let count = 0;
        const vertexIndex = this.vertices.indexOf(v);
        for (const column of this.matrix[vertexIndex]) {
            if (column === 1) {
                count++;
            }
        }
        return count;
    }
}

const graph = new Graph();
graph.addVertex(1)
graph.addVertex(2)
graph.addVertex(3)
graph.addVertex(4)
// console.log('graph.hasVertex(1)', graph.hasVertex(1)) // true
graph.addEdge(1,2)
graph.addEdge(2,3)
graph.addEdge(1,4)
// console.log('graph.hasEdge(1, 2);', graph.hasEdge(1, 2))
graph.removeVertex(3)
// graph.removeEdge(1,2)
console.log('graph.countEdge(1)', graph.countEdge(1))
console.log(graph)