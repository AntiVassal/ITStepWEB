const changeTab = (tab, content) => {
    document.querySelectorAll("nav > ul > li.active").forEach(el => el.classList.remove("active"));
    document.querySelectorAll("section > div.active").forEach(el => el.classList.remove("active"));
    tab.classList.add("active");
    content.classList.add("active");
}

const initTask = (tab, content, customInitializer, isDefault) => {
    tab.addEventListener("click", () => changeTab(tab, content));
    customInitializer();
    if (isDefault) {
        changeTab(tab, content);
    }
}

const countVowels = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return str.split('').filter(c => vowels.some(v => v.toLowerCase() === c.toLowerCase())).length;
}

const initTask1 = () => {
    const input = document.querySelector("section > div:first-child > input");
    const p = document.querySelector("section > div:first-child > p");
    const recalcVowels = () => {
        const count = countVowels(input.value);
        p.textContent = `Count Vowels: ${count}`;
    }
    input.addEventListener("keyup", recalcVowels);
    recalcVowels();
}

const indexLargest = (arr, index) => {
    if (arr.length <= index) {
        return null;
    }
    return arr.sort((a, b) => a - b).reverse()[index];
}

const createLi = (value, deleteAction) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = 'x';
    button.addEventListener("click", () => {
        li.remove();
        deleteAction();
    });
    const text = document.createElement("p");
    text.textContent = value;
    li.appendChild(text);
    li.appendChild(button);
    return li;
}
const secondLargest = (arr) => indexLargest(arr, 1);
const initTask2 = () => {
    const input = document.querySelector("section > div:nth-child(2) > div > div > input");
    const add = document.querySelector("section > div:nth-child(2) > div > div > button");
    const p = document.querySelector("section > div:nth-child(2) > div > div > p");
    const ul = document.querySelector("section > div:nth-child(2) > div > ul");
    let elements = [];
    const recalc = () => {
        const largest = secondLargest(elements);
        p.textContent = largest !== null ? `Second Largest: ${largest}` : '';
    }
    add.addEventListener("click", () => {
        const value = parseInt(input.value);
        elements.push(value);
        const li = createLi(value, () => {
            elements.splice(elements.indexOf(value), 1);
            recalc();
        });
        ul.appendChild(li);
        recalc();
    });
    recalc();
}
const getCharList = (str) => {
    const arr = str.split('').map(c => c.toLowerCase());
    const elements = new Map();
    arr.forEach(c => {
        elements.set(c, (elements.get(c) ?? 0) + 1);
    });
    return elements;
}
const isAnagram = (str1, str2) => {
    const chars1 = getCharList(str1);
    const chars2 = getCharList(str2);
    return chars1.size === chars2.size ? chars1.keys().every(c => chars1.get(c) === chars2.get(c)) : false;
}
const initTask3 = () => {
    const input1 = document.querySelector("section > div:nth-child(3) > input:first-child");
    const input2 = document.querySelector("section > div:nth-child(3) > input:nth-child(2)");
    const p = document.querySelector("section > div:nth-child(3) > p");
    const recalc = () => {
        const anagram = isAnagram(input1.value, input2.value);
        p.textContent = `Is Anagram: ${anagram}`;
    }
    input1.addEventListener("keyup", recalc);
    input2.addEventListener("keyup", recalc);
}

const initTask4 = () => {
    const addInput = document.querySelector("section > div:nth-child(4) > div > div > input:first-child");
    const addButton = document.querySelector("section > div:nth-child(4) > div > div > button");
    const sumInput = document.querySelector("section > div:nth-child(4) > div > div > input:nth-child(4)");
    const p = document.querySelector("section > div:nth-child(4) > div > div > p:last-child");
    const ul = document.querySelector("section > div:nth-child(4) > div > ul");
    let elements = [];
    const recalc = () => {
        for (let i = 0; i < elements.length; ++i) {
            for (let j = i + 1; j < elements.length; ++j) {
                if ((elements[i] + elements[j]) === parseInt(sumInput.value)) {
                    p.textContent = `Index: ${i} and ${j}`;
                    return;
                }
            }
        }
        p.textContent = '';
    }
    addButton.addEventListener("click", () => {
        const value = parseInt(addInput.value);
        elements.push(value);
        const li = createLi(value, () => {
            elements.splice(elements.indexOf(value), 1);
            recalc();
        });
        ul.appendChild(li);
        recalc();
    });
    sumInput.addEventListener("keyup", recalc);
    recalc();
}

const isPalindrome = (str) => {
    const len = str.length / 2;
    for (let i = 0; i < len; ++i) {
        if (str.charAt(i).toLowerCase() !== str.charAt(str.length - i - 1).toLowerCase()) {
            return false;
        }
    }
    return true;
}

const initTask5 = () => {
    const input = document.querySelector("section > div:nth-child(5) > input");
    const p = document.querySelector("section > div:nth-child(5) > p");
    const recalc = () => {
        const palindrome = isPalindrome(input.value);
        p.textContent = `Is Palindrome: ${palindrome}`;
    }
    input.addEventListener("keyup", recalc);
    recalc();
}

const getRomanNumber = (number) => {
    const map = new Map([
        [1, 'I'],
        [4, 'IV'],
        [5, 'V'],
        [9, 'IX'],
        [10, 'X'],
        [40, 'XL'],
        [50, 'L'],
        [90, 'XC'],
        [100, 'C'],
        [400, 'CD'],
        [500, 'D'],
        [900, 'CM'],
        [1000, 'M']
    ]);
    const keys = Array.from(map.keys());
    let result = '';
    while (number > 0) {
        const nums = keys.filter((k, i) => k <= number);
        const last = nums[nums.length - 1];
        result += map.get(last);
        number -= last;
    }
    return result;
}

const initTask6 = () => {
    const input = document.querySelector("section > div:last-child > input");
    const p = document.querySelector("section > div:last-child > p");
    const recalc = () => {
        const romanNumber = getRomanNumber(parseInt(input.value));
        p.textContent = `Roman Numerals: ${romanNumber}`;
    }
    input.addEventListener('keyup', recalc);
    recalc();
}

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("nav > ul > li");
    const contents = document.querySelectorAll("section > div");
    const customInitializers = [initTask1, initTask2, initTask3, initTask4, initTask5, initTask6];
    for (let i = 0; i < Math.min(tabs.length, customInitializers.length, contents.length); i++) {
        initTask(tabs[i], contents[i], customInitializers[i], i === 0);
    }
});