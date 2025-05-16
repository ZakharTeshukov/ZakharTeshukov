Certainly! Here is the **fully updated and unified Java review guide**, now with both parts of the lesson included and organized for clarity:

---

# 📘 Java Review Guide: Classes, Methods, Strings, and Operators

---

## 📍 SECTION 1: Classes and Methods

### ✅ Understanding Method Types

| Term           | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **Method**     | A behavior or function defined in a class.                                |
| **Static**     | Belongs to the class itself. Called using `ClassName.methodName()`.       |
| **Non-static** | Belongs to an individual object. Requires creating an instance to access. |

---

### 🎂 Example: `Cake` and `Bakery` Classes

#### 🔹 Static Method – `listFlavorChoices`

* **Belongs to**: Cake class itself.
* **Call with**: `Cake.listFlavorChoices();`
* **Returns**: `String` (list of flavors).
* **Important**: Return value must be stored or printed.

  ```java
  System.out.println(Cake.listFlavorChoices());
  ```

#### 🔹 Non-static Method – `howManyCalories`

* **Belongs to**: Cake objects.
* **Steps**:

  1. Create a `Cake` object:

     ```java
     Cake vanilla = new Cake();
     ```
  2. Call the method:

     ```java
     int calories = vanilla.howManyCalories();
     ```

#### 🔹 Non-static Method – `addWriting`

* **Has Parameter**: Takes a `String`.
* **Call with**:

  ```java
  vanilla.addWriting("Happy Birthday");
  ```

#### 🔒 Private Method – `mixIngredients`

* **Private Access**: Only callable **within** the Cake class.
* **Can be called indirectly** via public methods in the Cake class.

---

### 🧠 Key Method Concepts

| Component       | Description                                     |
| --------------- | ----------------------------------------------- |
| Access Modifier | `public`, `private`, etc. (controls visibility) |
| Return Type     | e.g., `int`, `String`, `void`                   |
| Method Name     | Identifier like `howManyCalories`               |
| Parameters      | Inputs like `(String message)`                  |

---

## 📍 SECTION 2: Strings in Java

### 📘 What Is a String?

* A **data type** that holds text.
* Internally, a string is an **array of `char`**.
* Strings are **objects**, not primitives.

---

### 🧱 Memory & Storage

| Concept         | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| **Stack**       | Stores variable references.                                                   |
| **Heap**        | Stores objects.                                                               |
| **String Pool** | Optimized memory for string literals. Same values point to the same object.   |
| **Immutable**   | Strings **cannot be changed** once created. Any changes produce a new string. |

---

### 📄 Declaring Strings

#### ✅ Common Way (String Pool used)

```java
String a = "Hello";
```

#### ⚠️ Less Common (Bypassing String Pool)

```java
String c = new String("Hello");
```

---

### 🆚 Equality

#### Referential Equality (`==`)

* Compares **memory locations**.
* True only if both variables point to **same object**.

#### Value Equality (`.equals`)

* Compares the **contents** of the strings.
* Preferred way for comparing strings:

```java
a.equals(b);          // true if values are the same
a.equalsIgnoreCase(b); // ignores capitalization
```

---

### 🛠 Useful String Methods

| Method                          | Description                                                       |
| ------------------------------- | ----------------------------------------------------------------- |
| `length()`                      | Returns the number of characters.                                 |
| `substring(start)`              | Returns part of the string starting at index `start`.             |
| `substring(start, end)`         | Returns characters from `start` (inclusive) to `end` (exclusive). |
| `equals(otherString)`           | Checks for value equality (case-sensitive).                       |
| `equalsIgnoreCase(otherString)` | Value equality ignoring case.                                     |
| `compareTo(otherString)`        | Returns difference in Unicode values; 0 if equal.                 |

---

### 🧪 String Examples

```java
String e = "hi";
String f = e;
String g = "howdy";
String h = new String("Hi");

// Comparisons
e == f;                  // true (same object)
e == h;                  // false (different objects)
e.equals(h);             // false (case-sensitive)
e.equalsIgnoreCase(h);  // true
g.length();              // 5
g.substring(2);          // "wdy"
g.substring(1, 4);       // "owd"
```

---

## 📍 SECTION 3: The Plus `+` Operator in Java

### ➕ Dual Purposes of `+`

| Operation         | Description                                       |
| ----------------- | ------------------------------------------------- |
| **Addition**      | Adds numeric values (int + int, double + double). |
| **Concatenation** | Joins two strings together.                       |

### 🔢 Examples: Addition

```java
3 + 5             // 8 (int)
2.0 + 4.0         // 6.0 (double)
4.2 + 3           // 7.2 (int is promoted to double)
```

### 🔤 Examples: Concatenation

```java
"Hello" + " " + "World"   // "Hello World"
"Score: " + 100           // "Score: 100"
```

> ⚠️ Java will **implicitly convert** non-strings (e.g., int, double) to strings when used in concatenation.

---

## ✅ Summary Recap

### 🎯 Classes & Methods

* Use **`ClassName.methodName()`** for static methods.
* Use **`objectName.methodName()`** for non-static methods.
* Understand method headers (access, return, name, parameters).

### 🎯 Strings

* Strings are objects and immutable.
* Use `.equals()` to compare values, not `==`.
* Use `substring()`, `length()`, and `compareTo()` for manipulation.

### 🎯 Operators

* `+` can mean **addition** (for numbers) or **concatenation** (for strings).
* Java automatically handles type conversion during concatenation.

---

Let me know if you want **practice questions**, **diagrams**, or **code samples** for any part of this guide!
