export default function getQuickSortAnimations(arr){
    let animations = [];
    quickSort(arr);
    return [arr,animations];

    function quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }

        return arr;
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low;

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                swap(arr, i, j);
                i++;
            }
        }

        swap(arr, i, high);
        return i;
    }

    function swap(arr, i, j) {
        if (i !== j){
        animations.push([i,j]);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        animations.push([i, j]);
        }
    }
}






  
