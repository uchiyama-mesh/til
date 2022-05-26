# JS Technique

## 配列をn個ずつに分割
- `const split = (array, n) => array.reduce((a, c, i) => i % n == 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])`
- 例
  - `split([1, 2, 3, 4], 2) // -> [[1, 2], [3, 4]]`
- 参考元様
  - [JSで配列をn個ずつに分割](https://qiita.com/guttyar2213/items/46230300c5100a06198c)