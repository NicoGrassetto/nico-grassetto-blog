---
title: "JavaScript ES2024: New Features to Know"
date: "2024-04-02"
image: "/nico-grassetto-blog/images/test-image.png"
description: "Exploring the latest JavaScript features in ES2024"
---

# JavaScript ES2024: New Features to Know

The JavaScript ecosystem continues to evolve with ES2024 bringing several exciting new features that improve developer experience and code quality.

## Array.prototype.toSorted()

A new method that returns a sorted copy of an array without mutating the original:

```javascript
const numbers = [3, 1, 4, 1, 5];
const sorted = numbers.toSorted(); // [1, 1, 3, 4, 5]
console.log(numbers); // [3, 1, 4, 1, 5] - original unchanged
```

## Object.groupBy()

Group array elements by a key function:

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 }
];

const grouped = Object.groupBy(people, person => person.age);
// { 25: [{name: 'Alice', age: 25}, {name: 'Bob', age: 25}], 30: [...] }
```

## Promise.withResolvers()

A new utility for creating promises with external resolve/reject:

```javascript
const { promise, resolve, reject } = Promise.withResolvers();

// Use resolve/reject from outside the promise constructor
setTimeout(() => resolve('Done!'), 1000);
```

These features make JavaScript more powerful and developer-friendly!
