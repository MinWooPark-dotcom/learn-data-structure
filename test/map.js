// ECMAScript 2015 introduces a new data structure to map values to values. A Map object is a simple key/value map and can iterate its elements in insertion order.
// 실행 시까지 키를 알 수 없고, 모든 키가 동일한 type이며 모든 값들이 동일한 type일 경우에 objects를 대신해서 map를 사용
// 여기선 왜 Map을 썼을까? => 객체의 프로퍼티 갯수를 알아야 하고 set, get, delete 메서드들이 간편
// 맵 객체는 객체의 프로퍼티를 자주 변경해야할 때 빛을 발합니다.
// 메소드 이름들이 예측 가능하여 동작이 명확하고, 기존 객체와 달리 순회도 쉽게 이루어져 데이터를 조작하기 적합한 것 같습니다. 물론 모든 상황에 맵 객체를 쓸 필요는 없고, 자주 변경하지 않는 정보들은 객체에 저장해도 무방할 것 같습니다.


let sayings = new Map();
sayings.set('dog', 'woof'); // 어떤 값도 키가 될 수 있음.
console.log('sayings', sayings) // Map { 'dog' => 'woof' }
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
console.log('sayings.size', sayings.size); // 3, size를 구하는 법이 쉽다.
sayings.get('dog'); // woof
sayings.get('fox'); // undefined
sayings.has('bird'); // false
sayings.delete('dog');
sayings.has('dog'); // false

for (let keyValue of sayings) { // for ...of문 돌리면 [key, value]를 받음.
    console.log(keyValue); // ['cat', 'meow'], [ 'elephant', 'toot']
}


for (let [key, value] of sayings) {
    console.log(key + ' goes ' + value); // cat gose meow, elephant goes toot
}

sayings.clear();
sayings.size; // 0