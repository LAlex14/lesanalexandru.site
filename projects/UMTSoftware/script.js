const input = document.getElementById('input'),
    submitBtn = document.getElementById('submit'),
    trueResult = document.getElementById('true'),
    falseResult = document.getElementById('false');

function initiate() {
    trueResult.classList.add('d-none');
    falseResult.classList.add('d-none');
}

initiate();

function showTrue() {
    trueResult.classList.toggle('d-none');
}

function showFalse() {
    falseResult.classList.toggle('d-none');
}

var splitArraySameAverage = function (A) {
    const sum = A.reduce((a, b) => a + b);
    const N = A.length;
    const dp = {};

    A.sort((a, b) => b - a);
    for (let i = 1; i < A.length; i++) {
        if (sum * i % N === 0 && dfs(0, sum * i / N, i)) {
            return true;
        }
    }
    return false;

    function dfs(start, target, k) {
        if (target === 0 && k === 0) return true;
        if (target < 0 || k === 0) return false;
        if (target > k * A[start]) return false;

        const hash = [start, target, k].join(',');
        if (dp[hash] !== undefined) {
            return dp[hash];
        }

        for (let i = start; i < N; i++) {
            if (dfs(i + 1, target - A[i], k - 1)) {
                return true;
            }
        }
        dp[hash] = false;
        return false;
    }
}

// A = [2, 1, 3, 0];
// A = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(splitArraySameAverage(A));

submitBtn.addEventListener('click', () => {
    initiate();
    if (input.value.length > 1 && input.value.slice(-1) != ',') {
        let array = input.value.split(",").map(el => +el);

        if (splitArraySameAverage(array)) showTrue();
        else showFalse();
    }
    // console.log(array);
});
