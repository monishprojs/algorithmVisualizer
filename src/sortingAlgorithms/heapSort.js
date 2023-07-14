export default function getHeapSortAnimations(arr) {
    const n = arr.length;
    const animations = []

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }

    return animations;


    function heapify(arr, n, rootIndex) {
        let largest = rootIndex;
        const leftIndex = 2 * rootIndex + 1;
        const rightIndex = 2 * rootIndex + 2;

        if (leftIndex < n && arr[leftIndex] > arr[largest]) {
            largest = leftIndex;
        }

        if (rightIndex < n && arr[rightIndex] > arr[largest]) {
            largest = rightIndex;
        }

        if (largest !== rootIndex) {
            swap(arr, rootIndex, largest);
            heapify(arr, n, largest);
        }
    }

    function swap(arr, i, j) {
        animations.push([i, j]);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        animations.push([i, j]);
    }
}










