Here’s a cleaner, more structured, and professional format of your AP Computer Science A video script for **Unit 1: Introduction to Java Programming**. It is broken down with clear section headers, concise language, and natural transitions for both teaching and YouTube engagement.

---

### 🎬 Intro

**Hello and welcome to the new AP Computer Science A video series — Unit 1!**
If you want to jump ahead to a specific topic, check out the time markers in the video description.

I'll be updating this series frequently, so make sure to **subscribe** and stay up to date with new content.

For this series, I'm using the **jGRASP IDE**, but feel free to use any IDE you’re comfortable with. If you need help installing jGRASP, check the link in the description.

---

### 🧱 Part 1: Creating Your First Java Class

In Java, every program must start with **at least one class**. To create a class, type:

```java
public class MyFirstProgram {
    // code goes here
}
```

* The class name must be written in **PascalCase** (each word capitalized, no spaces).
* The file name must exactly match the class name, but with `.java` at the end.
* Java uses **curly brackets `{}`** to define where blocks of code begin and end — including classes and methods.

---

### 🧠 Part 2: Writing the `main` Method

Every Java program needs a **`main` method** — this is the entry point of your code:

```java
public static void main(String[] args) {
    // code goes here
}
```

* This tells the computer where to start running your code.
* Inside the curly brackets of `main`, we’ll write commands.
* Remember: open a curly bracket `{` → **indent** everything inside → close with `}`.

---

### 📤 Part 3: Printing to the Console

Now let’s print something!

```java
System.out.println("Hello, world!");
```

* `System` (capital S) is a built-in Java class.
* `out.println` sends output to the console.
* Text inside **quotes** is called a **String literal**.
* **Don’t forget the semicolon** `;` at the end of this statement.

---

### 🧪 Part 4: Running the Code

To run your program:

1. **Build → Compile** (checks for errors and converts to bytecode).
2. **Build → Run** (executes your program).
3. You should see `Hello, world!` in the console.

---

### 📦 Part 5: Working with Variables

A **variable** stores data you can use and modify. Let's declare an `int`:

```java
int x;        // Declaration
x = 10;       // Initialization
x = 5;        // Change the value
x = x + 1;    // Increment x by 1
```

Java treats the `=` sign like a **left-pointing arrow**:
→ It evaluates the right side, then stores the result in the variable on the left.

---

### ✍️ Naming Variables

Variable names follow **lowerCamelCase**:

```java
int myFinalScore = 10;
```

* First word starts lowercase.
* Every following word starts with a capital letter.
* No spaces or symbols.

To print a variable’s value:

```java
System.out.println(myFinalScore);
```

(Notice: no quotes around the variable name, or it will print the text `"myFinalScore"` instead of its value.)

---

### 🔢 Part 6: Primitive Data Types

Java has **8 built-in (primitive) data types**. You only need to master **three** for the AP exam:

1. **int** → whole numbers
2. **double** → decimals
3. **boolean** → `true` or `false`

Example:

```java
int a = 3;
double b = 3.0;
boolean c = true;
```

Note: You **can’t assign a `double` to an `int`** without **casting**:

```java
a = (int) 3.99;  // a = 3 (cuts off decimal)
```

---

### ➗ Part 7: Arithmetic Operators

You can perform math using operators:

```java
+   // addition
-   // subtraction
*   // multiplication
/   // division
%   // modulus (remainder)
```

Examples:

```java
System.out.println(6 + 4);   // 10
System.out.println(11 % 3);  // 2 (11 ÷ 3 = 3 R2)
```

---

### 🔄 Part 8: Shorthand and Unary Operators

You can **update variable values** using shorthand:

```java
x = x + 1;
x++;          // same as above

x = x - 1;
x--;          // same as above

x *= 3;       // shorthand for x = x * 3;
```

For **booleans**, we can use the **not operator**:

```java
boolean z = true;
z = !z;       // flips z to false
```

---

### 📚 Bonus: Explore More

To learn more about Java's data types, search:
**“primitive data types site\:oracle.com”**
and click the first result — it’s the official documentation.

---

### ✅ Wrap-Up

That’s it for **Unit 1** — we covered:

* Creating your first class and method
* Printing to the console
* Using variables and data types
* Performing arithmetic
* Understanding Java syntax rules

🧠 If you’re preparing for the AP Computer Science A exam, mastering these basics is crucial.
📌 Like, subscribe, and check the playlist for the next unit!

---

Would you like this formatted into a PDF or slide deck too?
