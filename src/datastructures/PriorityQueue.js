import QueueElement from "./QueueElement.js";

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(elem, prio) {
        const queueElement = new QueueElement(elem, prio);
        let contain = false;
        for (var i=0; i < this.items.length; i++) {
            // since this is undirect graph we can ignore duplicate edges for the queue e.g., (x,y) == (y,x)
            if (this.items[i].elem[0] === queueElement.elem[1] && this.items[i].elem[1] === queueElement.elem[0]) {
                contain = true;
                break;
            }
            // stop and insert element when we find the prio of next elem to be higher
            if (this.items[i].prio > queueElement.prio) {
                this.items.splice(i, 0, queueElement);
                contain = true;
                break;
            }
        }
        // if cant find a priority higher than it we push it on the end of queue
        if (!contain) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    rear() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].elem + " ";
        return str;
    }
}

export default PriorityQueue;
