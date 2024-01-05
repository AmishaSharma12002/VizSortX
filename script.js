// Function to generate random array
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

// Function to create bars in the visualization container
function createBars(array) {
    const visualizationContainer = document.getElementById("visualization");
    visualizationContainer.innerHTML = "";

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value}px`;
        visualizationContainer.appendChild(bar);
    });
}

// Function to swap elements in the array
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Function to update the visualization
function updateBars(array) {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.height = `${array[index]}px`;
    });
}

// Function to reset the visualization with a new random array
function resetVisualization() {
    const arraySize = 50; // Change the size as needed
    const newArray = generateRandomArray(arraySize);
    createBars(newArray);
    return newArray;
}

// Selection Sort
async function selectionSort(array) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        swap(array, i, minIndex);
        updateBars(array);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Merge Sort
async function mergeSort(array) {
    async function merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }

    async function mergeSortRecursive(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = await mergeSortRecursive(arr.slice(0, middle));
        const right = await mergeSortRecursive(arr.slice(middle));

        return await merge(left, right);
    }

    array = await mergeSortRecursive(array);
    updateBars(array);
}

// Bubble Sort
async function bubbleSort(array) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                updateBars(array);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}

// Function to handle sorting algorithm selection
async function selectAlgorithm(algorithm) {
    // Reset the visualization before starting a new algorithm
    const newArray = resetVisualization();

    switch (algorithm) {
        case "selection":
            await selectionSort([...newArray]);
            break;
        case "merge":
            await mergeSort([...newArray]);
            break;
        case "bubble":
            await bubbleSort([...newArray]);
            break;
        default:
            break;
    }
}

// Function to reset the bars to an unsorted state
function resetBars() {
    const newArray = resetVisualization();
    updateBars(newArray);
}

// Function to animate the appearance of characters in the h1 tag
function animateH1() {
    const h1 = document.querySelector('h1');
    const text = h1.textContent;
    h1.textContent = ''; // Clear the text content

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            h1.textContent += text[i];
            h1.style.opacity = 1; // Set opacity to 1 to make it visible
        }, i * 100); // Adjust the delay as needed
    }
}

// Initial visualization
resetVisualization();

// Trigger the h1 animation after a delay (adjust as needed)
setTimeout(animateH1, 500);
