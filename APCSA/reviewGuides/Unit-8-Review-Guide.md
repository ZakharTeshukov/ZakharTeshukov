**AP Computer Science A — Unit 8 Review: Two‑Dimensional Arrays**

---

## 1. Declaring & Initializing 2D Arrays

### ▶️ Fixed‑size Declaration

```java
int[][] a = new int[3][4];
```

* Two sets of `[]` indicate a 2D array.
* Defaults: all `int` elements → 0.
* Conceptually **3 rows**, **4 columns**.

### ▶️ Literal Initialization

```java
int[][] b = {
  {2,3,1},
  {8,5,6}
};
```

* Each inner `{ ... }` defines a row.
* Rows can vary in length (jagged arrays).

---

## 2. Underlying Memory Model

* A 2D array is an **array of arrays**:

  ```text
  heap: [row0Ref, row1Ref, row2Ref]
         row0Ref ──▶ [ , , , ]
         row1Ref ──▶ [ , , , ]
         row2Ref ──▶ [ , , , ]
  ```
* Outer array holds references to **inner 1D arrays**.
* Inner arrays hold actual elements.

---

## 3. Accessing & Assigning Elements

```java
System.out.println(b[0][1]);  // row 0, col 1
a[1][2] = 9;                   // set row 1, col 2
boolean check = (a[2][0] < b[1][1]);
```

* First index = **row**, second = **column**.

---

## 4. Traversal with Nested Loops

### ▶️ Traditional `for` Loops (row‑major order)

```java
for (int r = 0; r < arr.length; r++) {
    for (int c = 0; c < arr[r].length; c++) {
        System.out.print(arr[r][c] + " ");
    }
    System.out.println();
}
```

* `arr.length` → number of rows.
* `arr[r].length` → length of row `r` (number of columns in that row).
* Can modify values inside loops (e.g., multiply elements).
* Can adjust increments (e.g., `r+=2`).

---

### ▶️ Enhanced `for` Loops

```java
for (int[] row : arr) {
    for (int val : row) {
        System.out.print(val + " ");
    }
    System.out.println();
}
```

* `row` refers to each inner array in turn.
* `val` is each element in `row`.
* Simpler but **cannot modify** original array elements.

---

## 5. Common Algorithms

### ▶️ Double All Elements

```java
for (int r = 0; r < arr.length; r++)
  for (int c = 0; c < arr[r].length; c++)
    arr[r][c] *= 2;
```

### ▶️ Reverse Each Row (In‑place)

```java
for (int r = 0; r < arr.length; r++) {
  int cols = arr[r].length;
  for (int c = 0; c < cols/2; c++) {
    int temp = arr[r][c];
    arr[r][c] = arr[r][cols-1-c];
    arr[r][cols-1-c] = temp;
  }
}
```

---

## 6. Temple of Arrays FRQ Pattern

Given a 2D `String[][] floor`, implement:

1. **`lineOfIdentical(String[] row)`** → `boolean`:

   * Return `true` if **all** entries in `row` are equal.
2. **`isFloorSafe(String[][] floor)`** → `boolean`:

   * No entries equal to "X" or "Y".
   * Not **all** entries are identical.
3. **`canCrossFloor(String[][] floor)`** → `boolean`:

   * `isFloorSafe(floor) == true` **and**
   * **At least one** row satisfies `lineOfIdentical(...)`.

**Traversal tip**: Use **for** loops over `floor.length` (rows) and `floor[r].length` (cols).

---

## 7. Key Takeaways

* 2D arrays are **arrays of arrays**; can be jagged.
* Always use `arr.length` for rows and `arr[r].length` for columns.
* Nested `for` loops (row-major) for full traversal.
* Enhanced `for` is concise but **read-only** for element assignments.
* Understand memory layout: stack holds references, heap holds inner arrays and data.

---

**Master these patterns** to ace AP CSA questions on two‑dimensional arrays!
