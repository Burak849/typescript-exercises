var ListNode = /** @class */ (function () {
    function ListNode(value) {
        this.value = value;
    }
    return ListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.length = 0;
    }
    LinkedList.prototype.add = function (value) {
        // you must declare a lot of type guards thats why we will use "T" for getting the used value's type
        var node = new ListNode(value);
        if (!this.root || !this.tail) {
            this.root = node; // if root is not null our root is ListNode's node
            this.tail = node; // we must declare it to node because we can get undefined in else 
        }
        else { // otherwise its current root
            //     let current = this.root;
            //     while ( current.next ){
            //         current = current.next;
            //     } // this will give last node
            //     current.next = node; 
            this.tail.next = node; // we updated the next tail node to old tail node 
            this.tail = node; // then we are updating the next tail node
        }
        this.length++;
    };
    ;
    LinkedList.prototype.insertAt = function (value, pos) {
        if (pos > -1 && pos < this.length && this.root) { // pos cant be negatif and more than length of the list and root is not null
            var current = this.root; // we are describing the values which we need
            var index = 0;
            var previous = current;
            var node = new ListNode(value);
            if (pos === 0) { // if adding is going to first position 
                node.next = this.root; // next node is the root 
                this.root = node; // and root is updating to old node 
            }
            else {
                while (index++ < pos && current.next) { // if adding position in the middle or end 
                    previous = current; // update the previous to current value
                    current = current.next; // and update the current to next current value
                }
                node.next = current; // for the other positions adding the new node to current
                previous.next = node; // and previous one to current node
            }
            this.length++; // increment the length of the ListNode
            return true;
        }
        else {
            return false; // if the position is undefined its false
        }
    };
    LinkedList.prototype.removeAt = function (pos) {
        if (pos > -1 && pos < this.length && this.root) { // same reasons in insertAt
            var current = this.root;
            var previous = current;
            var index = 0;
            if (pos === 0) { // if the first value will be deleted
                this.root = current.next; // set the root to new value
            }
            else {
                while (index++ < pos && current.next) { // if first value or last value will be deleted
                    previous = current; // set the previous value to current 
                    current = current.next; // and later set the current value to new value
                }
                previous.next = current.next; // normally previous.next was supposed to show current value but we deleted it so
                // it will show use the next one
            }
            this.length--;
            return current;
        }
        else {
            return null;
        }
    };
    LinkedList.prototype.getNumberOfElements = function () {
        return this.length;
    };
    ;
    LinkedList.prototype.print = function () {
        var current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    };
    return LinkedList;
}());
var numberList = new LinkedList();
var nameList = new LinkedList();
// list.root or list.length we cant access that because its private
numberList.add(10);
numberList.add(20);
numberList.add(-5);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();
console.log('REMOVING INDEX 1');
numberList.removeAt(1);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();
console.log('INSERTING AT INDEX 1');
numberList.insertAt(100, 1);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();
