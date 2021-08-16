// 인접 행렬
// 그래프에 간선이 많이 존재하는 밀집 그래프(Dense Graph) 의 경우
// 장점
// 두 정점을 연결하는 간선의 존재 여부 (M[i][j])를 O(1) 안에 즉시 알 수 있다.
// 정점의 차수 는 O(N) 안에 알 수 있다. : 인접 배열의 i번 째 행 또는 열을 모두 더한다.
// 정점의 차수(degree): 무방향 그래프에서 하나의 정점에 인접한 정점의 수
// 무방향 그래프에 존재하는 정점의 모든 차수의 합 = 그래프의 간선 수의 2배

// 단점
// 어떤 노드에 인접한 노드들을 찾기 위해서는 모든 노드를 전부 순회해야 한다.
//     그래프에 존재하는 모든 간선의 수는 O(N^2) 안에 알 수 있다. : 인접 행렬 전체를 조사한다.
// 출처: https://gmlwjd9405.github.io/2018/08/13/data-structure-graph.html

// 입출력 예시
// edge가 있는 경우 directed, edge가 없는 경우 undirected
let result = createMatrix([
    // [fromVertext, toVertext, isDirect]
    [0, 3, "undirected"], // 0 -> 3
    [0, 2, "undirected"], // 0 - 2, 2 - 0
    [1, 3, "undirected"], // 1 -> 3
    [2, 1, "undirected"], // 2 -> 1
]);

console.log(result);
// console.log(result[0][3]);

/** [
 * [ 0, 0, 1, 1 ],
 * [ 0, 0, 1, 1 ],
 * [ 1, 1, 0, 0 ],
 * [ 1, 1, 0, 0 ]
 * ] **/


// 코드 구현
function createMatrix(edges) {
    let matrix = [];    // 리턴할 배열
    let maxLength = 0;	// edges의 값들 중 가장 큰 수를 찾음 => 각 값들이 vertex이기 때문에 가장 큰 값이 vertex의 갯수
    let lengths = [];     // 각 vertex의 값들을 담아 maxlength를 알아내기 위한 용도

    for (const edge of edges) {
        // 전개 구문으로 [x, y, z]를 배열을 펼칠 수 있음 => x y z
        lengths.push(...edge.slice(0, 2)); // 기존 edge 배열 그대로 넣지 않기 위해서 배열을 펼쳐서 넣음
    }
    // console.log('lengths', lengths) // [ 0, 3, 0, 2, 1, 3, 2, 1 ]

    // spread를 쓴 이유는 lengths는 배열이기 때문
    maxLength = Math.max(...lengths);

    // matrix 생성
    for (let i = 0; i <= maxLength; i++) {
        //반복문을 돌며 matrix안에 maxLength의 길이 만큼 배열을 만들고 그만큼 0으로 채운다.
        matrix.push(new Array(maxLength + 1).fill(0)); // 제로 인덱스라서 +1을 해서 새로 만들 arrayLength를 맞춤
    }

    for (let edge of edges) { // edges에 각 배열에 접근하여,
        matrix[edge[0]][edge[1]] = 1; //1을 넣어준다.
        // edges를 반복문으로 돌아서 각 edge에 접근 후 fromVertex와 toVertex를 가져와 이어줌

        if (edge[2] === "undirected") {   // 언디렉티드일 경우 방향이 없으니 양 쪽 모두에 연결된 것
            matrix[edge[1]][edge[0]] = 1;  // 반대로도 넣어준다.
        }
    }
    return matrix;
}


