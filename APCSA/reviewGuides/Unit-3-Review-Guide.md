**AP Computer Science A - Unit 3 Review: Boolean Expressions and Conditional Statements**

---

### 1. Boolean Expressions

* A **boolean expression** evaluates to either `true` or `false`.
* Common use: inside an `if` statement.
* Example:

  ```java
  if (3 > 2) {
      // Executes because expression is true
  }
  ```

---

### 2. Relational Operators

* Used to compare two values:

  * `==` : equals (used with **primitive** types)
  * `!=` : not equal
  * `>`  : greater than
  * `<`  : less than
  * `>=` : greater than or equal to
  * `<=` : less than or equal to
* **Important:**

  * `==` is not the same as `=` (assignment).
  * `==` is only for primitives. Use `.equals()` for object comparisons.

---

### 3. Conditional (Logical) Operators

* Combine boolean expressions:

  * `&&` : AND (both must be true)
  * `||` : OR (either can be true)
* **Short-Circuiting**:

  * In `&&`, if the first condition is false, the second is not evaluated.
  * In `||`, if the first condition is true, the second is not evaluated.
  * **Avoids errors**, e.g., dividing by zero.

---

### 4. If / Else If / Else Statements

* Allow decision-making based on boolean expressions.
* **Syntax:**

  ```java
  if (condition) {
      // Executes if condition is true
  } else if (anotherCondition) {
      // Executes if above is false and this is true
  } else {
      // Executes if all above are false
  }
  ```
* **Rules:**

  * `if` and `else if` need a boolean expression.
  * `else` does **not** take a boolean expression.
  * Only **one** block is executed in an `if-else if-else` chain.

---

### 5. Code Tracing Example

```java
int x = 5;
if (x < 10) {
    System.out.println("A"); // Runs
}
if (x < 4) {
    System.out.println("B"); // Skipped
}
if (x < 7) {
    System.out.println("C"); // Runs
}
```

---

### 6. Nested If-Else Statements

* You can place `if-else` structures **inside** one another.
* Use indentation and comments to keep them clear.
* Example:

```java
int x = 5, y = 3;
if (x < 10) {
    if (y != 3) {
        System.out.println("A");
    } else if (y <= 5) {
        System.out.println("B"); // Runs
    } else {
        System.out.println("C");
    }
} else {
    if (y < 2) {
        System.out.println("D");
    } else if (y == 3) {
        System.out.println("E");
    }
}
```

---

### 7. Common Errors

* **Semicolon after `if`, `else if`, or `else`**:

  * Breaks the structure; block executes regardless.
* **Adding condition to `else`**:

  * Invalid: `else (x < 5)` → causes a compile error.
* **Multiple statements without curly braces**:

  * Only the first statement is considered inside the `if`.
  * Use `{}` for clarity and correctness.

---

### 8. One-Line Conditionals

* If only one line of code is needed, curly braces `{}` can be omitted.
* Example:

```java
if (x > 5)
    System.out.println("X is large");
```

---

**Summary:**

* Master relational and conditional operators.
* Understand the flow of if-else chains.
* Use short-circuit logic to avoid runtime errors.
* Trace and debug code to confirm logic correctness.
* Avoid common syntax errors by understanding Java rules.

Practice writing and tracing `if-else` structures to prepare for AP CSA exam questions!
