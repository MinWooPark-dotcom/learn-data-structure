class Node {
    constructor(data) {
        // 리스트의 기본 구성 단위 노드, 데이터와 포인터를 갖음
        this.data = data
        this.next = null;
    }
}

class SingleLinkedList {
    constructor() {
        // 리스트는 head, tail을 통해 첫 번째, 마지막 노드를 찾음.
        this.head = null;
        this.tail = null;
        this.size = 0
    }

    insertFirst(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }
        // 새로 만든 node의 next에 이전 리스트들을 통째에 붙임
        let current = this.head; // 현재 노드를 빼와서 추후 new Node에 붙임
        this.head = node;
        node.next = current;
        this.size++;
    }

    insertLast(data) {
        const node = new Node(data)
        if (!this.tail) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }
        // 기존의 tail의 next에 붙임
        let lastNode = this.tail;
        lastNode.next = node;
        this.tail = node;
        this.size++;
    }

    insertAt(data, index) {
        if (!this.head || index === 0) {
            this.insertFirst(data);
            return;
        } else if (index === this.size) {
            this.insertLast(data)
            return;
        }
        // 중간에 넣으니까 head, tail은 관련 없음
        const node = new Node(data);
        let current = this.head
        let count = 0;
        // 필요한 정보: 삽입할 전의 노드, 다음 노드
        while (count < index -1) {
            current = current.next;
            count++;
        }
        node.next = current.next;
        current.next = node;
        this.size++;
    }

    getAt(index) {
        this.checkIndexRange(index)
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                console.log('current', current.data)
                return;
            }
            current = current.next;
            count++;
        }
    }

    modify(data, index) {
        // 변경하려는 노드에만 접근하면 됨.
        this.checkIndexRange(index)
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
        // 기존 head의 next에 head 설정
        let current = this.head;
        this.head = current.next;
        delete current.data;
        delete current.next;
        this.size--;
    }

    removeLast() {
        // 기존 tail의 이전 노드를 tail로 설정
        // tail 이전 노드까지 접근: this.size - 2 만큼
        let current = this.head;
        let tail = this.tail;
        let count = 0;
        while (count < this.size -2) {
            current =  current.next;
            count++;
        }
        this.tail = current
        current.next = null;
        delete tail.data;
        delete tail.next;
        this.size--;
    }

    removeAt(index) {
        // count === index로 특정 노드애 접근
        this.checkIndexRange(index);
        let current = this.head;
        let prev = this.head;
        let count = 0;

        if (index === 0) {
            this.removeFirst()
            return;
        } else if (index === this.size -1) {
            this.removeLast();
            return;
        }

        while (current) {
            if (count === index) {
                prev.next = current.next;
                delete current.data;
                delete current.next;
                this.size--;
                return;
            }
            prev = current
            current = current.next;
            count++;
        }
    }

    printDataList() {
        let current = this.head;
        while(current) {
            console.log(current.data)
            current = current.next;
        }
    }

    checkIndexRange(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('invalid range');
        } else {
            return;
        }
    }
}

const singleLinkedList = new SingleLinkedList()
singleLinkedList.insertFirst(1)
// singleLinkedList.insertFirst(2)
singleLinkedList.insertLast(2)
singleLinkedList.insertLast(3)
// singleLinkedList.insertAt(4,1);
// singleLinkedList.getAt(2)
// singleLinkedList.modify(4, 0)
// singleLinkedList.removeFirst()
// singleLinkedList.removeLast()
singleLinkedList.removeAt(2)
singleLinkedList.printDataList()
console.log('sll', singleLinkedList);
