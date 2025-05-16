Below is the **complete review sheet for AP Computer Science A – Unit 5: Writing Classes**, combining both parts of Lesson 5 into one cohesive document.

---

# 📘 Unit 5 Review: Writing Classes in Java

## 1. Object-Oriented Basics

* **Object (Instance)**: holds state (fields) and behavior (methods).
* **Class**: a blueprint defining fields and methods for its objects.

---

## 2. Static vs. Non-Static Members

| Member Type       | Keyword  | Belongs To  | Accessible By               | Shared?           |
| ----------------- | -------- | ----------- | --------------------------- | ----------------- |
| Class Variable    | `static` | The class   | Static & non-static methods | Yes (one copy)    |
| Instance Variable | *(none)* | Each object | Non-static methods          | No (per instance) |

* **Static methods** can only access static fields.
* **Non-static methods** can access both instance and static fields.

---

## 3. Declaring Methods

```java
accessModifier [static] returnType methodName(parameterList) {
    // method body
}
```

* **Access Modifiers**: `public` (anywhere) or `private` (within class).
* **`static`** marks class methods; omit for non-static.
* **Return Type**: `void` (no return) or any primitive/object type.
* **Method Name**: lowerCamelCase, descriptive.
* **Parameters**: comma-separated; each has a type and name.

---

## 4. Getter & Setter Methods

* **Why?** Fields are often `private` for encapsulation; getters/setters allow controlled access.

```java
public class Student {
    private int studentId;            // instance field
    private static String mascot;     // class field

    // Getter for instance field
    public int getStudentId() {
        return studentId;
    }
    // Setter for instance field
    public void setStudentId(int newId) {
        studentId = newId;
    }

    // Getter for class field
    public static String getMascot() {
        return mascot;
    }
    // Setter for class field
    public static void setMascot(String newMascot) {
        mascot = newMascot;
    }
}
```

* **getX()** returns the field’s value.
* **setX(value)** assigns a new value to the field.

---

## 5. Constructors

* **Constructor**: special method named exactly like the class, no return type, runs when you `new` an object.
* **Uses**: initialize fields, call helper methods.

```java
public class Robot {
    private static String fuelSource;
    private String name;

    // No-arg constructor
    public Robot() {
        fuelSource = "Electricity";
        randomName();
    }

    // Overloaded constructor
    public Robot(String newName) {
        fuelSource = "Electricity";
        name = newName;
    }
}
```

* **Overloaded Constructors**: multiple constructors with different parameter lists.
* If **no constructors** are provided, Java supplies a **default no-arg constructor**.

---

## 6. The `this` Keyword

* `this` refers to the **current object**.
* **Disambiguate fields vs. parameters**:

  ```java
  private int x;
  public void setX(int x) {
      this.x = x;
  }
  ```
* **Call another constructor**:

  ```java
  public Robot() {
      this("Wall-E");  // must be first line
  }
  ```
* **Pass current object**:

  ```java
  otherObj.process(this);
  ```

---

## 7. Method Overloading

Define multiple methods with **same name** but **different signatures**:

✔ Valid overload if one of:

* Different **number** of parameters, or
* Different **types** of parameters, or
* Different **order** of parameter types.

```java
void outputAnswer() { … }
void outputAnswer(int x) { … }
void outputAnswer(int x, int y) { … }
```

✖ Invalid overload if signatures collide (even with different return types or parameter names).

---

## 8. Scope & Lifetime of Variables

* **Scope**: where a variable can be accessed (determined by where declared).
* **Lifetime**: when it exists in memory (from creation to destruction).

### Examples

```java
public static void main(String[] args) {
    int a = 1;       // scope: entire method; lifetime: until main ends

    {
        int b = 2;   // scope: this block only; lifetime: block’s execution
    }

    for (int c = 0; c < 3; c++) {
        int d = c;  // scope & lifetime: each iteration of this loop
    }
}
```

* **Local variables** (in methods/blocks) die when the block/method exits.
* **Parameters** act like locals, created when method runs, destroyed on return.
* **Instance fields** exist as long as the object exists.
* **Static fields** exist once the class is loaded, until program ends.

---

### End of Unit 5 Review

Practice creating classes, constructors, getters/setters, and overloaded methods. Trace memory with `this` and variable scope to solidify your understanding!
