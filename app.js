// app.js
class Numbers {
    constructor(numbers) {
        this.arr = numbers.map(Number); // تحويل العناصر إلى أرقام
    }

    addNumbers(number) {
        this.arr.push(Number(number));
    }

    equalizeNumber() {
        let equalize = null;

        for (let i = 0; i < this.arr.length; i++) {
            let leftSumation = this.arr.slice(0, i).reduce((sum, num) => sum + num, 0);
            let rightSumation = this.arr.slice(i + 1).reduce((sum, num) => sum + num, 0);

            if (leftSumation === rightSumation) {
                equalize = this.arr[i];
                break;
            }
        }

        return equalize;
    }
}

function getRepeatedElements(arr) {
    let repeated = [];
    let count = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            count++;
        } else {
            if (count >= 3) {
                const times = Math.floor(count / 3);
                for (let j = 0; j < times; j++) {
                    repeated.push(arr[i - 1].repeat(3));
                }
            }
            count = 1;
        }
    }

    // Handle the last sequence
    if (count >= 3) {
        const times = Math.floor(count / 3);
        for (let j = 0; j < times; j++) {
            repeated.push(arr[arr.length - 1].repeat(3));
        }
    }

    return repeated;
}

document.addEventListener("DOMContentLoaded", () => {
    const resultsDiv = document.getElementById('results');
    const numberInput = document.getElementById('numberInput');
    const elementInput = document.getElementById('elementInput');
    const processButton = document.getElementById('processButton');
    const clearButton = document.getElementById('clearButton');

    processButton.addEventListener('click', () => {
        // Get numbers from input and trim spaces
        let numbersArray = numberInput.value.split(',').map(num => num.trim()).filter(num => num !== '');
        let numbersObj = new Numbers(numbersArray);

        // Get repeated elements
        let elementsArray = elementInput.value.split(',').map(e => e.trim()).filter(e => e !== '');
        let repeatedArray = getRepeatedElements(elementsArray);

        // Display results
        resultsDiv.innerHTML = `
            <h2>Results:</h2>
            <p><strong>Equalize Number:</strong> ${numbersObj.equalizeNumber() || 'None found'}</p>
            <p><strong>Repeated Elements:</strong> ${repeatedArray.length > 0 ? repeatedArray.join(', ') : 'None found'}</p>
        `;
    });

    clearButton.addEventListener('click', () => {
        numberInput.value = '';
        elementInput.value = '';
        resultsDiv.innerHTML = '';
    });
});
