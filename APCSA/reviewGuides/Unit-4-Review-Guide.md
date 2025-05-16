**AP Computer Science A - Unit 4 Review: Lesson 4**

---

**Overview**
This lesson explores the three main types of loops in Java: `for`, `while`, and `do-while`. It also demonstrates practical applications such as reversing a string using a `for` loop and introduces the concept of nested loops, which are especially useful when working with multi-dimensional data structures.

---

### **1. For Loops**

**Purpose:** Repeat a block of code a specific number of times.

**Structure:**

```java
for (initialization; test; update) {
    // body of loop
}
```

**Example: Printing 0 to 3**

```java
for (int i = 0; i < 4; i++) {
    System.out.println(i);
}
```

**Execution Steps:**

* Initialize `i = 0`
* Test `i < 4`: If true, execute body
* Print value of `i`
* Update `i++`
* Repeat until `i < 4` is false

---

### **2. While Loops**

**Purpose:** Repeat a block of code *while* a condition is true.

**Structure:**

```java
while (condition) {
    // body of loop
}
```

**Example: Countdown from 4**

```java
int i = 4;
while (i > 0) {
    System.out.println(i);
    i--;
}
```

**Notes:**

* Be cautious of infinite loops. If `i` is never changed inside the loop, it runs forever.
* A `while` loop may never run if the initial condition is false.

---

### **3. Do-While Loops**

**Purpose:** Like a `while` loop, but guarantees the body executes *at least once*.

**Structure:**

```java
do {
    // body of loop
} while (condition);
```

**Example:**

```java
int i = -2;
do {
    System.out.println(i);
    i--;
} while (i > 0);
```

**Note:** Ends with a semicolon after the condition.

---

### **4. String Reversal Using For Loop**

**Goal:** Reverse the characters in a string.

**Example Code:**

```java
String original = "pupils";
String reverse = "";

for (int i = original.length() - 1; i >= 0; i--) {
    reverse += original.substring(i, i + 1);
}

System.out.println(reverse); // Output: slipup
```

**Key Concepts:**

* `substring(i, i + 1)` extracts one character at a time.
* Strings are 0-indexed; loop starts at `length - 1`.

---

### **5. Nested Loops**

**Definition:** A loop inside another loop.

**Example:**

```java
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        System.out.println("i = " + i + ", j = " + j);
    }
}
```

**Execution:**

* Outer loop runs twice (`i = 0` and `i = 1`)
* For each outer loop run, inner loop runs three times (`j = 0, 1, 2`)
* Total iterations of inner loop: 2 \* 3 = 6

**Use Cases:**

* Two-dimensional arrays
* Complex pattern generation

---

### **Summary Table**

| Loop Type   | Condition Location | Runs at Least Once? | Best For                |
| ----------- | ------------------ | ------------------- | ----------------------- |
| For         | Beginning          | No                  | Known iteration counts  |
| While       | Beginning          | No                  | Condition-based repeats |
| Do-While    | End                | Yes                 | At least one execution  |
| Nested Loop | Varies             | Varies              | 2D arrays or grids      |

---

**Key Terms:**

* **Counter Variable:** Tracks iterations (e.g., `i`, `j`)
* **Condition/Test Expression:** Boolean controlling loop continuation
* **Update Expression:** Changes counter after each iteration
* **Infinite Loop:** A loop that never ends due to a non-false condition
* **Substring Method:** `substring(start, end)` retrieves part of a string (exclusive of `end`)

---

**Next Steps:**

* Practice writing loops with different conditions and structures
* Trace loop execution step-by-step to predict output
* Try modifying the string reversal algorithm to skip vowels
* Implement a nested loop to print a multiplication table

---

**End of Lesson 4 Review**
