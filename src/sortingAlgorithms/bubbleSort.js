export default function getBubbleSortAnimations(arr) {
    const n = arr.length;
    let animations = []
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                //push the indices to be swapped to animations (twice)
                animations.push([j,j+1]);
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                animations.push([j, j + 1]);
            }
        }
    }
    return [arr,animations];
}