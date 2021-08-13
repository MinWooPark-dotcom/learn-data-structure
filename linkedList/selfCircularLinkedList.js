class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirst(data) {
        // 노드가 없을 때
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        // 노드가 있을 때: 새로운 노드로 head를 변경하고 next에 기존 헤드 노드를 붙인다.
        const prevHead = this.head;
        this.head = node;
        node.next = prevHead;
        this.size++;
    }

    insertLast(data) {
        // 노드가 없을 때
        const node = new Node(data);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        }
        // 노드가 있을 때: 마지막 노드의 next에 새로운 노드를 붙이고, 새로운 노드의 next에 head를 붙인다.
        const prevTail = this.tail;
        prevTail.next = node;
        this.tail = node;
        node.next = this.head;
        this.size++;
    }

    insertAt(data, index) {
        if (index < 0 || index > this.size) throw new Error('Invalid range'); // >= 가 아니라 >여서 checkIndexRange 못씀
        // 노드가 없을 때
        if (!this.head) {
            return this.insertFirst(data)
        }
        // 노드가 있을 때
        // 맨 앞에 추가
        if (index === 0) {
            return this.insertFirst(data);
        }
        // 맨 뒤에 추가
        if (index === this.size) {
            return this.insertLast(data)
        }
        // 새로 추가핧 노드 기준
        // 새로운 노드 next에 이전 노드의 next 붙임
        const node = new Node(data);
        let nextNode;
        let prevNode = this.head;
        let count = 0;
        while(prevNode) {
        // 이전 노드 next에 붙임
            if(count === index - 1) {
                nextNode = prevNode.next;
                prevNode.next = node;
                node.next = nextNode;
                return;
            }
            prevNode = prevNode.next;
            count++;
        }
    }


    getAt(index) {
        this.checkExistNode();
        this.checkIndexRange(index);
        let findNode = this.head;
        let count = 0;
        while(findNode) {
            if (index === count) {
                console.log(findNode.data);
                return;
            }
            findNode = findNode.next;
            count++;
        }
    }

    modifyAt(data, index) {
        this.checkExistNode();
        this.checkIndexRange(index);
        let node = this.head;
        let count = 0;
        while (node) {
            if (index === count) {
                node.data = data;
                return;
            }
            node = node.next;
            count++;
        }
    }

    removeFirst() {
        this.checkExistNode();
        // 삭제할 헤드
        const prevHead = this.head;
        // 기존 헤드의 next를 head로 지정
        const newHead = prevHead.next;
        // tail.next를 새로운 head로 지정
        const tail = this.tail;
        tail.next = newHead;
        this.head = newHead;
        delete prevHead.data;
        delete prevHead.next;
        this.size--;
        return;
    }

    removeLast() {
        this.checkExistNode();
        // 기존 테일의 이전 노드를 테일로 지정
        // 새로운 테일의 next를 헤드로 지정
        // 삭제할 테일
        const prevTail = this.tail
        let newTail = this.head;
        let count = 0;
        while(newTail) {
            if (count === this.size -2) { // tail노드 이전으로 가야해서 -2
                this.tail = newTail;
                newTail.next = this.head;
                delete prevTail.data;
                delete prevTail.next;
                this.size--;
                return;
            }
            newTail = newTail.next;
            count++;
        }
    }

    removeAt(index) {
        this.checkExistNode();
        this.checkIndexRange(index);
        if (index === 0) {
            return this.removeFirst();
        } else if (index === this.size -1) {
            return this.removeLast();
        }
        let prevNode = this.head
        let removeNode;
        let count = 0;
        while (prevNode) {
            if (count === index - 1) {
                removeNode = prevNode.next;
                // 삭제하려는 노드 기준 이전 노드의 next에 삭제하려는 노드의 next 노드를 붙여줌
                prevNode.next = removeNode.next;
                delete removeNode.data;
                delete removeNode.next;
                this.size--;
                return;
            }
            prevNode = prevNode.next;
            count++;
        }
    }

    checkIndexRange(index) {
        if (index < 0 || index >= this.size) throw new Error('Invalid range')
        return;
    }

    checkExistNode() {
        if (!this.size) throw new Error('Node dose not exist')
        return;
    }
}

const circularLinkedList = new CircularLinkedList();
circularLinkedList.insertFirst(3);
circularLinkedList.insertFirst(2);
circularLinkedList.insertFirst(1);
// circularLinkedList.insertAt(4,2);
// circularLinkedList.insertLast(3)
// circularLinkedList.modifyAt(0,2)
// circularLinkedList.removeFirst()
// circularLinkedList.removeLast()
circularLinkedList.removeAt(3)
console.log('circularLinkedList', circularLinkedList);
// circularLinkedList.getAt(2)

