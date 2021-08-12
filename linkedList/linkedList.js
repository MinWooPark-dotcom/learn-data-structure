/**
 * linked list: 리스트의 기본 구성 단위, 노드가 데이터와 포인터를 가지고 한 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료 구조
 * 종류:
 *  - 단일: 각 노드에 자료 공간과 한 개의 포인터 공간이 있고, 각 노드의 포인터는 다음 노드를 가르킴
 *  - 이중: 단일과 비슷하나 포인터 공간 두 개가 있어 앞과 뒤의 노드를 가르킴
 *  - 원형: 마지막 노드와 처음 노드를 연결
 * **/

// 노드 객체는 틀에 맞게 계속 생성하니까 OOP스럽게 클래스로 작성
class Node {
    constructor(data, next =null) {
        this.data = data;
        this.next = next;
    }
}

/** 단일 연결 리스트 **/
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 맨 앞에 삽입
    insertFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    // 중간에 삽입
    insertAt(data, index) {
        // 0이라면 head
        if (index === 0) {
            this.insertFirst(data);
        }
        // 맨 마지막이라면 last
        else if (index === this.size - 1) {
            this.insertLast(data);
        }
        // 0보다 크고 총 길이보다 작은 정상 범위
        else if (index > 0 && index < this.size) {
            // 원하는 위치의 전까지 접근해서 next에 넣는다.
            let node = new Node(data);
            let current, previous; // previous?
            current = this.head;
            let count = 0;

            while (count < index) {
                previous = current;
                count++;
                current = current.next
            }

            node.next = current; // 새로 만든 노드의 next에 기존 index 번 째였던 노드 붙임
            previous.next = node; // 새로 만든 노드가 들어갈 이전 노드의 next에 붙여줌

            this.size++
        }
        // 리스트의 범위 안이 아니면 에러
        else {
            throw new Error('invalid range');
        }
    }

    // 마지막에 삽입
    insertLast(data) {
        // 리스트의 마지막 노드에 접근하여 next에 들어가야한다.
        // 그런데 next는 Node를 만들 때 쓰니 애매하다. 새로운 노드의 next는 정할 수 있으나 이전 노드의 next는 어떻게 정하지?
        let node = new Node(data)
        let current

        if (!this.head) {
            this.head = node;
        } else {
            current = this.head // 왜 현재가 헤드지? => 몇 개 있는지 모르니까 헤드부터 next 없을 때 까지 계속 체크하기 위함

            while (current.next) { // while인 이유는 current.next가 없을 때까지 맨 마지막으로 가기 위해서
                current = current.next
            }
            current.next = node
        }
        this.size++;
    }

    getAt(index) {
        let current = this.head;
        let count = 0;

        while (current) {
            if (count == index) {
                console.log(current.data);
            }
            count++;
            current = current.next;
        }
        return null;
    }

    // 수정
    modifyAt(data, index) {
        let current = this.head;
        let count = 0;

        while (current) {
            if (count === index) {
                current.data = data;
            }
            count++;
            current = current.next;
        }
        return null;
    }

    // 삭제
    removeAt(index) {
        if (index < 0 || index > this.size) throw new Error('invalid index');

        // 삭제 index의 이전 next를 삭제 index의 다음 값에 연결
        let current = this.head;
        let previous;
        let count = 0;

        if (index === 0) {
            this.head = current.next;
        } else {
            while (count < index) {
                count++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next; // prev - cur - cur.next => cur 삭제해서 prev - cur.next로 수정
            delete current.data
            delete current.next
        }
        this.size--;
    }

    // 추가
    // data만 보여주는 용
    printListData() {
        let current = this.head;
        while(current) {
            console.log(current.data)
            current = current.next
        }
    }
    // 길이
}
const singleLinkedList = new SingleLinkedList();

singleLinkedList.insertFirst(1)
singleLinkedList.insertFirst(2)
singleLinkedList.insertLast(3)
singleLinkedList.insertAt(4,1)
singleLinkedList.modifyAt(10,0)
// console.log(singleLinkedList) // 10 - 4 - 1 - 3
singleLinkedList.removeAt(1) // 1번 째 4를 지움
console.log(singleLinkedList) // 10 - 1 - 3
// singleLinkedList.printListData(); // 10 1 3
// console.log('singleLinkedList.size', singleLinkedList.size) // 3