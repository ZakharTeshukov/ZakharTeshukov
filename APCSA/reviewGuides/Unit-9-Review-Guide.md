**AP Computer Science A — Unit 9 Review: Inheritance, Polymorphism & Constructors**

---

## 1. Inheritance Basics

* **Superclass**: Parent class (e.g., `Animal`).
* **Subclass**: Child class that **extends** a superclass (e.g., `Tiger` extends `Animal`).
* **`extends`** keyword declares a subclass:

  ```java
  class Animal { ... }
  class Tiger extends Animal { ... }
  ```
* Java classes that omit `extends` implicitly extend `Object`.
* **Single inheritance**: one direct superclass; **multiple subclasses** allowed.
* **`protected`**, `public` members inherited; **`private`** are not (but exist, accessible via superclass methods).

---

## 2. Method Inheritance & Access

* **Inherited methods**: All non-`private` instance methods from superclass.
* **Private methods**: Not inherited; can only be called within their own class.

```java
class Worker {
  public void doWork() { ... }
  private void earnMinWage() { ... }
}
class Tradesperson extends Worker {
  // inherits doWork(), not earnMinWage()
  public void doSkilledWork() { ... }
}
```

---

## 3. Method Overriding

* **Override** replaces superclass method in subclass.
* Only **non-static** methods.
* Annotate with `@Override` (optional but recommended).
* **Private methods** can’t be overridden—they’re not inherited.

```java
@Override
public void doWork() {
   // subclass-specific behavior
}
```

---

## 4. The `super` Keyword

* **`super.method()`** calls the version in the immediate superclass (bypasses override).
* **`super(args)`** in a constructor calls a superclass constructor (must be first line).

```java
class Car {
  public void applyBrakes() { ... }
  public void checkSurroundings() { ... }
}
class SelfDrivingCar extends Car {
  @Override
  public void applyBrakes() { ... }
  public void emergencyOverride() {
    super.applyBrakes();      // Car’s version
    checkSurroundings();      // current class’s override
  }
}
```

---

## 5. Accessing Private Superclass Fields

* **Direct access** to superclass `private` fields is **not** allowed.
* Use **inherited getters/setters** provided by superclass.

```java
class Animal {
  private int numLegs;
  public int getNumLegs() { return numLegs; }
}
class Bird extends Animal {
  public void report() {
    System.out.println(getNumLegs());
  }
}
```

---

## 6. Polymorphism & Variable Types

* **Reference variable** type determines **accessible methods**.
* **Object type** determines **which implementation** (override) runs.

```java
Animal a = new Lion();    // can call Animal’s methods
Animal b = new Bat();     // same reference type
// a.run(); // ❌ if run() is only in Mammal
a.sleep(); // ✔ inherited from Animal, overridden in Lion if exists
```

* Useful for **heterogeneous collections** and **general-purpose methods**:

  ```java
  Animal[] zoo = { new Lion(), new Dragon(), new Bat() };
  for(Animal x : zoo) x.eat();
  // dynamic dispatch calls each subclass’s eat()
  ```

---

## 7. Constructors & Inheritance

* **Every class** needs a constructor (default no-arg inserted if none).
* **Subclass constructor** must call a **superclass constructor** first (via `super(...)`) or default no-arg if no explicit call.
* **Constructors are not inherited**; each class defines its own.

```java
class Vehicle {
  public Vehicle(String type) { ... }
}
class Airplane extends Vehicle {
  public Airplane(String type, int seats) {
    super(type);           // call Vehicle(String)
    this.seats = seats;
  }
}
```

* If superclass lacks no-arg constructor, subclass **must** explicitly call a matching `super(...)`.

---

## 8. Overloaded Constructors

* Multiple constructors in same class, same name, different signatures (param number, types, order).
* Must differ in parameter list; return type and names irrelevant.

```java
public class Robot {
  public Robot() { ... }
  public Robot(String name) { this.name = name; }
  public Robot(String name, int id) { this(name); this.id = id; }
}
```

---

## 9. Key Takeaways

1. **`extends`** defines inheritance; **`super`** accesses parent behavior.
2. **Override** non-static methods for polymorphic behavior; use `@Override`.
3. **Constructors** chain via `super(...)` and/or `this(...)`; default provided only if none written.
4. **Polymorphism**: reference vs. object type distinction for compile-time vs. runtime resolution.
5. **Access control**: `private` not inherited; use superclass-provided accessors.

---

**Master these concepts** to design and leverage class hierarchies effectively in your AP CSA projects and exam answers!
