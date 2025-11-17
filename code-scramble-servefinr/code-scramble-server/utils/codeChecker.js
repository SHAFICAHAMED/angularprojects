const questions = {
    "easy1": {
        "question": [
            'name = "John"',
            'print(name)'
        ],
        "answer": 'name = "John"\nprint(name)'
    },
    "easy2": {
        "question": [
            '    print(i)',
            'for i in range(5):'
        ],
        "answer": 'for i in range(5):\n    print(i)'
    },
    "medium1": {
        "question": [
            'def greet(name):',
            ')',
            '    print(f"Hello, {name}"'
        ],
        "answer": 'def greet(name):\n    print(f"Hello, {name}")'
    },
    "medium2": {
        "question": [
            'numbers = [1, 2, 3, 4, 5]',
            'print(sum(numbers))'
        ],
        "answer": 'numbers = [1, 2, 3, 4, 5]\nprint(sum(numbers))'
    },
    "medium3": {
        "question": [
            'x = 10',
            'print(add(x, y))',
            'def add(a, b):',
            '    return a + b',
            'y = 5'
        ],
        "answer": 'def add(a, b):\n    return a + b\nx = 10\ny = 5\nprint(add(x, y))'
    },
    "medium4": {
        "question": [
            'print(list1)',
            'list2 = [4, 5, 6]',
            'list1.extend(list2)',
            'list1 = [1, 2, 3]'
        ],
        "answer": 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]\nlist1.extend(list2)\nprint(list1)'
    },
    "hard1": {
        "question": [
            'print(factorial(5))',
            '    return n * factorial(n-1)',
            '    if n == 0:',
            '        return 1',
            'def factorial(n):'
        ],
        "answer": 'def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n-1)\nprint(factorial(5))'
    },
    "hard2": {
        "question": [
            'print(fibonacci(7))',
            '    return fibonacci(n-1) + fibonacci(n-2)',
            'def fibonacci(n):',
            '    if n <= 1:',
            '        return n'
        ],
        "answer": 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\nprint(fibonacci(7))'
    },
   
    
};



function getRandomQuestion(){
    const keys=Object.keys(questions);
    const randomKey=keys[Math.floor(Math.random()*keys.length)];
    return {id:randomKey,...questions[randomKey]}

}


function checkAnswer(code,questionId){
   const cleanedInput = code.replace(/\s+/g, '').trim();
  const correct = questions[questionId].answer.replace(/\s+/g, '').trim();
  return cleanedInput === correct;
}

module.exports={getRandomQuestion,checkAnswer};


// utils/codeChecker.js

// Python questions (your original questions)
// const pythonQuestions = {
//     "easy1": {
//         "question": [
//             'name = "John"',
//             'print(name)'
//         ],
//         "answer": 'name = "John"\nprint(name)'
//     },
//     "easy2": {
//         "question": [
//             '    print(i)',
//             'for i in range(5):'
//         ],
//         "answer": 'for i in range(5):\n    print(i)'
//     },
//     // … Other Python questions
// };

// const cQuestions = {
//     "c1": {
//         "question": [
//             '#include <stdio.h>',
//             'int main() {',
//             '    printf("Hello, World!");',
//             '    return 0;',
//             '}'
//         ],
//         "answer": '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
//     }
// };

// const javaQuestions = {
//     "java1": {
//         "question": [
//             'public class HelloWorld {',
//             '    public static void main(String[] args) {',
//             '        System.out.println("Hello, World!");',
//             '    }',
//             '}'
//         ],
//         "answer": 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
//     }
// };

// // Get a random question based on the selected language.
// // Default to Python if no or unknown language is provided.
// function getRandomQuestion(language = 'python') {
//     let questionSet;
//     switch(language) {
//       case 'c':
//         questionSet = cQuestions;
//         break;
//       case 'java':
//         questionSet = javaQuestions;
//         break;
//       default:
//         questionSet = pythonQuestions;
//     }
//     const keys = Object.keys(questionSet);
//     const randomKey = keys[Math.floor(Math.random() * keys.length)];
//     return { id: randomKey, ...questionSet[randomKey] };
// }

// function checkAnswer(code, questionId, language = 'python') {
//   let questionSet;
//   switch(language) {
//     case 'c':
//       questionSet = cQuestions;
//       break;
//     case 'java':
//       questionSet = javaQuestions;
//       break;
//     default:
//       questionSet = pythonQuestions;
//   }
//   const cleanedInput = code.replace(/\s+/g, '').trim();
//   const correct = questionSet[questionId].answer.replace(/\s+/g, '').trim();
//   return cleanedInput === correct;
// }

// module.exports = { getRandomQuestion, checkAnswer };
