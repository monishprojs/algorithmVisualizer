export default function getInsertionSortAnimations(arr) {
    let animations = [];
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let currentIndex = i;
        while (currentIndex > 0 && arr[currentIndex] < arr[currentIndex - 1]) {
            animations.push([currentIndex,currentIndex - 1]);
            [arr[currentIndex], arr[currentIndex - 1]] = [arr[currentIndex - 1], arr[currentIndex]];
            animations.push([currentIndex, currentIndex - 1]);
            currentIndex--;
        }
    }
    return [arr,animations];
}