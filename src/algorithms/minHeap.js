export class MinHeap {
    constructor(maxSize) {
        this.arr = new Array(maxSize).fill(null); // The array to store nodes.
        this.maxSize = maxSize; // Maximum possible size of the heap.
        this.heapSize = 0; // Current number of elements in the heap.
    }

    // Heapifies a sub-tree with the root at index `i`.
    MinHeapify(i) {
        const l = this.lChild(i);
        const r = this.rChild(i);
        let smallest = i;

        // Compare left child
        if (l < this.heapSize && this.arr[l].distance < this.arr[smallest].distance) {
            smallest = l;
        }

        // Compare right child
        if (r < this.heapSize && this.arr[r].distance < this.arr[smallest].distance) {
            smallest = r;
        }

        // Swap and continue heapifying if root is not the smallest
        if (smallest !== i) {
            const temp = this.arr[i];
            this.arr[i] = this.arr[smallest];
            this.arr[smallest] = temp;
            this.MinHeapify(smallest);
        }
    }

    // Parent index
    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    // Left child index
    lChild(i) {
        return 2 * i + 1;
    }

    // Right child index
    rChild(i) {
        return 2 * i + 2;
    }

    // Removes the root (minimum element).
    extractMin() {
        if (this.heapSize <= 0) {
            return null;
        }
        if (this.heapSize === 1) {
            this.heapSize -= 1;
            return this.arr[0];
        }

        const root = this.arr[0];
        this.arr[0] = this.arr[this.heapSize - 1];
        this.heapSize -= 1;
        this.MinHeapify(0);

        return root;
    }

    // Inserts a new node into the MinHeap.
    insertKey(node) {
        if (this.heapSize === this.maxSize) {
            console.log("Overflow: Could not insertKey");
            return;
        }

        // Insert the new node at the end of the heap.
        let i = this.heapSize;
        this.arr[i] = node;
        this.heapSize += 1;

        // Fix the min heap property if it's violated.
        while (i !== 0 && this.arr[this.parent(i)].distance > this.arr[i].distance) {
            const temp = this.arr[i];
            this.arr[i] = this.arr[this.parent(i)];
            this.arr[this.parent(i)] = temp;
            i = this.parent(i);
        }
    }

    // Returns the minimum element (root).
    getMin() {
        return this.arr[0];
    }

    // Returns whether the heap is empty.
    isEmpty() {
        return this.heapSize === 0;
    }
}
