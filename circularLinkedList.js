/**
 * linked list: 리스트의 기본 구성 단위, 노드가 데이터와 포인터를 가지고 한 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료 구조
 * 종류:
 *  - 단일(Single): 각 노드에 자료 공간과 한 개의 포인터 공간이 있고, 각 노드의 포인터는 다음 노드를 가르킴
 *  - 이중(Doubly): 단일과 비슷하나 포인터 공간 두 개가 있어 앞과 뒤의 노드를 가르킴
 *  - 원형(Circular): 마지막 노드와 처음 노드를 연결
 *
 *  원형 연결리스트에서는 head 노드를 항상 맨 뒤 노드를 가르키게 해야 삽입/삭제 구현 시 계산이 편리함.
 *  그래서 head를 없애고 맨 뒤 노드를 가르키는 tail만 존재하는 변형된 형태로 자주 사용됨.
 *
 *  * **/

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertFirst(data) {
        // 리스트에 노드가 없을 때
        if (!this.head) {
            this.head = new Node(data)
            this.size++;
            return;
        }
        let node = new Node(data);
        let prevHead = this.head;
        let current = this.head;
        let lastNode;
        let count = 0;
        // size 2부터 next가 있음, size -1를 해야 next가 마지막을 가르킴
         while (this.size > 1 && count < this.size -1) {
             current = current.next;
             count++;
         }
         lastNode = current;
        // 마지막 next가 new Node,
        lastNode.next = node
        // new Node의 next로 기존 첫 번째를
        node.next = prevHead
        this.head = node
        this.size++
    }

    insertLast(data) {
        // 필요한 정보: head, tail
        if (!this.head) {
            this.head = new Node(data);
            this.size++;
            return;
        }
        let node = new Node(data);
        let current = this.head;
        let head = this.head;
        let count = 0;
        let lastNode;
        while (this.size > 1 && count < this.size - 1) {
            current = current.next;
            count++
        }
        lastNode = current;
        // 마지막의 next를 new Node
        lastNode.next = node;
        // new Node의 next를 head
        node.next = head;
        this.size++;
    }

    insertAt(data, index) {
        // 노드가 없을 때
        if (!this.head) {
            this.insertFirst(data);
            return;
        }
        // 인덱스가 리스트 맨 마지막일 때
        else if (index === this.size) {
            this.insertLast(data);
            return;
        }
        // 중간에 넣을 때
        else if (index > 0 && index < this.size) {
            // 새로 넣을 노드 기준
            // 이전 노드의 next에 추가
            // 새로운 노드의 next에 다음 노드 추가
            // 필요한 정보: 이전 노드, 다음 노드
            const node = new Node(data)
            let current = this.head
            let previous;
            let count = 0;
            // 넣을 인덱스 만큼 current.next로 앞 뒤 노드 접근
            while (count < index - 1) {
                current = current.next
                count++
            }
            previous = current;
            node.next = current.next;
            previous.next = node;
            this.size++;
        }
    }
    
    getAt(index) {
       // count === index로 get하려는 노드에 접근
       let current = this.head
       let count = 0;
       if (index < 0 || index >= this.size) throw new Error('invalid range');
       while (count < index) {
           current = current.next;
           count++;
       }
       console.log(current.data)
    }
    
    modify(data, index) {
        // count === index로 modify하려는 노드에 접근
        let current = this.head;
        let count = 0;
        if (index < 0 || index >= this.size) throw new Error('invalid range');
        while (count < index) {
            current = current.next;
            count++;
        }
        current.data = data;
    }
    
    removeAt(index) {
        if (index < 0 || index >= this.size) throw new Error('invalid error');
        // 필요한 정보: 삭제하려는 이전 노드, 다음 노드
        let current = this.head;
        let previous;
        let count = 0;
        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }
        // 삭제하려는 노드 기준
        // 이전 노드의 next를 다음 노드로
        previous.next = current.next;
        // 노드 키 삭제
        delete current.data;
        delete current.prev;
        delete current.next;
        this.size--;
    }
    
    printListData() {
        let current = this.head;
        let count = 0;
        while(count < this.size) {
            console.log(current.data);
            current = current.next
            count++;
        }
    }
}

const circularLinkedList = new CircularLinkedList();
circularLinkedList.insertFirst(2)
// console.log(circularLinkedList)
circularLinkedList.insertFirst(1)  // head가 2로 안바뀜
// console.log(circularLinkedList)
circularLinkedList.insertFirst(0)
// console.log(circularLinkedList) // 0-1-2-0-...
// circularLinkedList.insertLast(3)
// circularLinkedList.insertAt(22,2)
// circularLinkedList.modify(10, 0)
// circularLinkedList.getAt(1)
// circularLinkedList.removeAt(1)
// console.log(circularLinkedList) // 0-1-2-3-0-...
circularLinkedList.printListData();