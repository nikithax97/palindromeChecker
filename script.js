document.addEventListener("DOMContentLoaded", () => {
    //2-access all elements
    const input = document.getElementById('input');
    const button = document.getElementById('button');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const emoji = document.getElementById('emoji');
    const stepsSection = document.getElementById('steps');
    const stepsList = document.getElementById('steps-list');
    //4-event listeners for buton and enter
    button.addEventListener("click", checkPalindrome);
    input.addEventListener('keydown', function(e) {
        if(e.key === "Enter") {
            checkPalindrome();
        }
    });
    //5-function to check palindrome
    function checkPalindrome() {
        //5.1-clear previous results
        resultContainer.className = 'hidden';
        stepsSection.className = 'hidden';
        stepsList.innerHTML = '';
        //5.2 get nd validate input
        const newInput = input.value.trim();
        if(newInput === '') {
            showError('please enter a word or phrase!');
            return;
        }
        //5.3-clean input
        const cleaned = newInput.toLowerCase().replace(/[^a-z0-9]/g, '');
        if(cleaned === '') {
            showError('please enter at least one alphanumeric character.');
            return;
        }
        //5.4 recusively check nd collect steps
        const steps = [];
        const isPalindrome = checkPalindromeRecursive(cleaned, 0, cleaned.length - 1, steps);

        displayResult(isPalindrome, newInput);
        displaySteps(steps);
    }

    //6-recursive with step tracking
    function checkPalindromeRecursive(str, start, end, steps) {
        if(start >= end) return true;

        const match = str[start] === str[end];
        steps.push({
            step: steps.length + 1,
            charA: str[start],
            charB: str[end],
            match: match
        });

        if(!match) return false;

        return checkPalindromeRecursive(str, start + 1, end - 1, steps);
    }

    //7-display result
    function displayResult(isPalindrome, newInput) {
        resultContainer.classList.remove('hidden', 'not-palindrome', 'palindrome');

        if(isPalindrome) {
            resultContainer.classList.add('palindrome');
            emoji.innerText = "☑️";
            resultText.innerText = `${newInput} is a palindrome.`;
        } else{
            resultContainer.classList.add('not-palindrome');
            emoji.innerText = "😔";
            resultText.innerText = `${newInput} is not a palindrome.`;
        }
    }

    //8- showing steps of comparision
    function displaySteps(steps) {
        if(!steps.length) return;

        stepsSection.classList.remove('hidden');

        steps.forEach(({step, charA, charB, match}) => {
            const li = document.createElement('li');

            const stepNum = document.createElement('span');
            stepNum.innerText = `step ${step}: `;

            const compareText = document.createElement('span');
            compareText.innerText = `'${charA}' vs '${charB}'`;

            const resultSpan = document.createElement('span');
            resultSpan.innerText = match ? '✅ Match' : '❌ Mismatch';
            resultSpan.style.color = match ? 'green' : 'red';
            resultSpan.style.marginLeft = '10px';

            li.appendChild(stepNum);
            li.appendChild(compareText);
            li.appendChild(resultSpan);

            stepsList.appendChild(li);
        });
    }

    //9-error handling
    function showError(message) {
        resultContainer.classList.remove('hidden', 'palindrome');
        resultContainer.classList.add('not-palindrome');
        emoji.innerText = '⚠️';
        resultText.innerText = message;
    }
})






