export default function getHeapSortAnimations(arr) {
    const n = arr.length;
    let animations = [];
    // Helper function to heapify a subtree rooted at index i
    const heapify = (heapSize, root) => {
        let largest = root;
        const leftChild = 2 * root + 1;
        const rightChild = 2 * root + 2;

        if (leftChild < heapSize && arr[leftChild] > arr[largest]) {
            largest = leftChild;
        }

        if (rightChild < heapSize && arr[rightChild] > arr[largest]) {
            largest = rightChild;
        }

        if (largest !== root) {
            // Swap elements and recursively heapify the affected subtree
            //push indices to be swapped to animations (twice))
            animations.push([root,largest]);
            [arr[root], arr[largest]] = [arr[largest], arr[root]];
            animations.push([root, largest]);
            heapify(heapSize, largest);
        }
    };

    // Build max-heap from the array (bottom-up approach)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // Extract elements from the max-heap one by one and place them at the end
    for (let i = n - 1; i > 0; i--) {
        // Swap root (maximum) element with the last unsorted element
        //push indices to be swapped to animations (twice)
        animations.push([i,0]);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        animations.push([i, 0]);
        // Heapify the reduced heap (excluding the last element)
        heapify(i, 0);
    }

    return [arr,animations];
}







