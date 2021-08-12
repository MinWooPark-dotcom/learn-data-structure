class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirst(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            // 기존 노드가 있는 경우
            let current = this.head;
            current.prev = node;
            this.head = node;
            node.next = current;
        }
        this.size++
        return;
    }

    insertLast(data) {
        const node = new Node(data);
        if (!this.tail) {
            this.head = node;
            // this.tail = node;
        } else {
            // 기존 노드가 있는 경우: 기존 테일의 next에 new Node, new Node의 prev에 기존 테일
            let current = this.head;
            let count = 0;
            let prevTail;
            while(count < this.size -1) {
                current = current.next;
                count++;
            }
            current.next = node;
            node.prev = current;
        }
        this.tail = node;
        this.size++;
        return;
    }

    insertAt(data, index) {
        this.checkIndexRange(index);
        if (index === 0) {
            return this.insertFirst(data);
        } else if (index === this.size) {
            return this.insertLast(data)
        }
        const node = new Node(data);
        let nextNode = this.head;
        let prevNode = this.head;
        let count = 0;
        while (nextNode) {
            if (count === index) {
                prevNode.next = node;
                node.prev = prevNode;
                node.next = nextNode;
                nextNode.prev = node;
            }
            nextNode = nextNode.next;
            count++;
        }
        this.size++;
        return;
    }

    getAt(index) {
        if (index < 0 || index >= this.size) throw new Error('invalid error') // >=이라서 직접 작성
        let current = this.head;
        let count = 0;
        while(current) {
            if (count === index) {
                console.log(current.data)
                return;
            }
            current = current.next;
            count++;
        }
    }

    printDataList() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    modifyAt(data, index) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                current.data = data;
                return;
            }
            current = current.next;
            count++;
        }
    }

    removeFirst() {
        if (!this.head) throw new Error('node not found');
        const prevHead = this.head;
        const newHead = prevHead.next;
        this.head = newHead;
        delete prevHead.data;
        delete prevHead.next;
        this.size--;
    }

    removeLast(data) {
        if (!this.tail) throw new Error('node not found');
        const prevTail = this.tail;
        let current = this.head;
        let count = 0;
        let newTail;
        while (current) {
            if (count === this.size - 2) {
                newTail = current;
                newTail.next = null;
                this.tail = newTail;
                delete prevTail.data;
                delete prevTail.next;
                delete prevTail.prev;
                this.size--;
                return;
            }
            current = current.next;
            count++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) throw new Error('invalid error') // >=이라서 직접 작성
        let nextNode, prevNode, removeNode;
        let current = this.head;
        let count = 0;
        if (index === 0) {
            return this.removeFirst()
        } else if (index === this.size -1) {
            return this.removeLast();
        }
        // 삭제 노드 기준
        // 이전 노드.next = 다음 노드
        // 다음 노드.prev = 이전 노드
        while (count < index - 1) { // 0,
            current = current.next;
            count++;
        }
        prevNode = current;
        removeNode = current.next;
        nextNode = removeNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        delete removeNode.data;
        delete removeNode.next;
        delete removeNode.prev
        this.size--;
    }


    checkIndexRange(index) {
        if (index < 0 || index > this.size) {
            throw new Error('invalid error')
        }
        return;
    }
}

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.insertFirst(2)
doublyLinkedList.insertFirst(1)
doublyLinkedList.insertLast(3)
// doublyLinkedList.insertAt(10,2)
// doublyLinkedList.getAt(2)
// doublyLinkedList.modifyAt(0,2)
// doublyLinkedList.removeFirst()
// doublyLinkedList.removeLast()
doublyLinkedList.removeAt(2)
// console.log(doublyLinkedList);
doublyLinkedList.printDataList()
