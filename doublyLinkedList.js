/**
 * linked list: 리스트의 기본 구성 단위, 노드가 데이터와 포인터를 가지고 한 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료 구조
 * 종류:
 *  - 단일: 각 노드에 자료 공간과 한 개의 포인터 공간이 있고, 각 노드의 포인터는 다음 노드를 가르킴
 *  - 이중: 단일과 비슷하나 포인터 공간 두 개가 있어 앞과 뒤의 노드를 가르킴
 *  - 원형: 마지막 노드와 처음 노드를 연결
 *
 *  doubly linked list는 노드가 양방향으로 연결되어 특정 인덱스 위치의 엘리먼트를 가져올 때 장점이 드러남.
 *  이전 노드를 지정하기 위한 변수를 더 사용하여 메모리를 더 많이 사용하는 단점도 있음.
 *  * **/

class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertFirst(data) {
        // 노드가 없을 때
        if (!this.head) {
            this.head = new Node(data)
        }
        // 노드가 있을 때
        else {
            let previousHead = this.head
            // 현재 head를 새로운 노드로 변경
            this.head = new Node(data)
            // 이전 헤드를 한 칸 뒤로 밀고 prev에 새로운 헤드를 붙임.
            previousHead.prev = this.head;
            // 새로운 헤드의 next에 이전 리스트를 통째로 붙임
            this.head.next = previousHead
        }
        this.size++;
    }

    insertLast(data) {
        // 새로운 노드 생성
        let node = new Node(data)
        // console.log('n',node)
        let previousList = this
        // console.log('t',this)
        // 맨 마지막 노드의 next에 새로운 노드를 붙임
        let current;
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next
            }
            node.prev = current
            current.next = node;
        }
        this.size++;
    }

    insertAt(data, index) {
        // 노드가 없을 때
        if (index === 0) {
            this.insertFirst(data);
        }
        // 인덱스가 리스트 맨 마지막일 때
        else if (index === this.size - 1) {
            this.insertLast(data);
        }
        // 중간에 넣을 때
        else if (index > 0 && index < this.size) {
            // 새로운 노드 기준
            // 이전 노드에는 next에 새로운 노드
            // 다음 노드에는 prev에 새로운 노드
            // 새로운 노드에는 prev, next 모두 설정
            let node = new Node(data)
            let current, previous;
            let count = 0;
            current = this.head;

            while (count < index) {
                previous = current;
                count++;
                current = current.next;
            }
            // prev의 next, cur의prev에 연결
            previous.next = node;
            node.prev = previous
            current.prev = node;
            node.next = current
            this.size++
        }
    }

    getAt(index) {
        let current;
        let count = 0;
        // count를 이용해 index만큼 current.next로 이동
        if (index >= 0 && index < this.size && this.head) {
            current = this.head;
            while (count < index) {
                current = current.next;
                count++;
            }
            console.log('current', current)
            // 값을 반환하지 않는데 return으로 끝내야하나? => return이 없는 함수는 자동으로 undefined 반환
            // return current;
        } else {
            throw new Error('invalid range');
        }
    }

    modify(data, index) {
        // 원하는 index까지 current.next로 이동
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                current.data = data
            }
            count++;
            current = current.next;
        }
    }

    removeAt(index) {
        // 삭제 위치까지 current.next로 이동
        // 삭제 인덱스 기준
        // 이전 노드의 next를 삭제 인덱스 다음 노드로 연결
        // 다음 노드의 prev를 삭제 인덱스 이전 노드로 연결
        // 삭제 인덱스 delete로 키 제거
        if (index < 0 || index >= this.size) throw new Error('invalid index');

        let current = this.head;
        let previous;
        let count = 0;
        // index가 0인 경우
        if (count === index) {
            previous = current;
            this.head = current.next;
            delete previous.data;
            delete previous.prev;
            delete previous.next;
            return;
        }

        while (count < index) {
            previous = current;
            current = current.next
            count++
        }
        previous.next = current.next;
        current.next.prev = previous;
        delete current.data
        delete current.prev
        delete current.next
    }

    printListData() {
        let current = this.head
        while(current) {
            console.log(current.data)
            current = current.next
        }
    }
}

const doublyLinkedList = new DoublyLinkedList();
// doublyLinkedList.insertFirst(2)
// doublyLinkedList.insertFirst(1)
doublyLinkedList.insertFirst(0)
doublyLinkedList.insertLast(1)
doublyLinkedList.insertLast(2)

// console.log('doublyLinkedList', doublyLinkedList)
// console.log('doublyLinkedList.head.next.prev', doublyLinkedList.head.next.prev)
// console.log('doublyLinkedList.head.next.prev', doublyLinkedList.head.next.next)
// doublyLinkedList.insertLast(4);
// doublyLinkedList.insertAt(11, 1);
// doublyLinkedList.modify(22, 1)
// console.log('doublyLinkedList', doublyLinkedList.head.next.next.next)
// doublyLinkedList.getAt(0)
// doublyLinkedList.removeAt(2)
// console.log('doublyLinkedList', doublyLinkedList)
doublyLinkedList.printListData()