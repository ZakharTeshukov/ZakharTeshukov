**AP Computer Science A — Unit 6 Review: Arrays in Java**

---

## 1. What Is an Array?

* A **variable** holds one value; an **array** holds multiple values of the **same** type in indexed slots.
* Declared once but each element accessed by **zero-based index**.
* **Use case**: Manage related data (e.g., runs per inning) with a single structure instead of many variables.

---

## 2. Declaring & Initializing Arrays

### ▶️ Fixed Size Declaration

```java
int[] scores = new int[9];
// size 9, defaults to 0 for ints
```

* Syntax: `type[] name = new type[size];`
* Defaults:

  * `int` → 0, `double` → 0.0, `boolean` → false, object → null

### ▶️ Literal Initialization

```java
int[] data = {1, 2, 3, 4};
// size 4, elements set explicitly
```

---

## 3. Accessing & Modifying Elements

```java
array[index] = newValue;   // assign
int x = array[index];      // retrieve
```

* **Index out of bounds** if `index < 0` or `index >= array.length` → runtime exception.

---

## 4. Memory Model: Primitives vs. Arrays

* **Primitives** (`int a = 3;`) store value on the **stack**.
* **Array variables** store a **pointer** on the stack, pointing to an array **object** on the heap.
* Assigning one array reference to another copies the **pointer** (both variables refer to same object).

```text
Stack:  c ──▶ [1,2,3,4]
        d ──▶ [1,2,3,4]

Heap:   [1,2,99,4]
```

*(Modifying via either reference affects the same heap object.)*

---

## 5. Traversing Arrays

### ▶️ `for` Loop

```java
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}
```

* Control start/end/update in header.
* Can modify `i` behavior (step size, start index).

### ▶️ `for-each` Loop

```java
for (int value : arr) {
    System.out.print(value + " ");
}
```

* Simpler syntax; **no indexing** and **cannot** modify original array elements.

---

## 6. Common Array Algorithms

### ▶️ Reverse an Array In-Place

```java
for (int i = 0; i < arr.length/2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
```

* Swap elements from ends toward center.
* Uses `length/2` as number of swaps.

### ▶️ Find Largest Element

```java
int largest = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
        largest = arr[i];
    }
}
System.out.println("Largest = " + largest);
```

* Initialize with `arr[0]`, compare each, update if larger.
* For **smallest**, invert comparison (`<`).

---

## 7. Key Points & Best Practices

* **Zero-based indexing**: first element at index 0.
* Always check bounds: `0 <= index < arr.length`.
* Use `arr.length`, **not** `arr.length()`, to get size.
* Choose `for` vs. `for-each` based on need to modify or skip indices.
* Avoid null-pointer errors by initializing arrays before use.

---

**Master these patterns** to handle AP CSA array questions efficiently!
