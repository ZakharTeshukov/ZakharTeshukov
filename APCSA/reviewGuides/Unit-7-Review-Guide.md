**AP Computer Science A — Unit 7 Review: ArrayList**

---

## 1. Array vs. ArrayList

* **Array**: fixed-size, indexed container for primitives or objects.
* **ArrayList**: dynamic-size list, only holds **object** types, resizes automatically.

---

## 2. Setup & Declaration

```java
import java.util.ArrayList;

// Declare & instantiate an empty ArrayList of String
ArrayList<String> list = new ArrayList<>();

// Declare & instantiate with initial values
ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(3,1,8));
```

* Must `import java.util.ArrayList`.
* Use **wrapper classes** for primitives (e.g., `Integer`, `Double`).
* **Autoboxing** wraps/unwraps primitives automatically most of the time.

---

## 3. Core Methods

| Action         | ArrayList Syntax                           | Returns            |
| -------------- | ------------------------------------------ | ------------------ |
| Add to end     | `list.add(item)`                           | `true`             |
| Add at index   | `list.add(index, item)`                    | void               |
| Get element    | `list.get(index)`                          | element at `index` |
| Set element    | `list.set(index, item)`                    | old element        |
| Remove element | `list.remove(index)` or `list.remove(obj)` | removed element    |
| Size           | `list.size()`                              | `int`              |

* Removing/inserting shifts subsequent elements and renumbers indices.

---

## 4. Traversal

### ▶️ Standard `for` Loop

```java
for (int i = 0; i < list.size(); i++) {
    System.out.print(list.get(i) + " ");
}
```

* Use `.size()` (not `.length`).
* Safe-guard against `IndexOutOfBounds` by checking `i < size()` each iteration.

### ▶️ Enhanced `for` Loop

```java
for (String s : list) {
    System.out.print(s + " ");
}
```

* Cannot modify the list’s structure (add/remove) or know the index inside the loop.

---

## 5. Wrapper Classes & Autoboxing

* Primitives cannot be stored directly; use their wrapper types:

  * `int` → `Integer`
  * `double` → `Double`
  * `boolean` → `Boolean`
* **Manual Boxing/Unboxing**:

  ```java
  Integer obj = Integer.valueOf(5);
  int x = obj.intValue();
  ```
* **Autoboxing**: Java automatically converts between `int`↔`Integer` when using `add()`, `get()`, etc.

---

## 6. Removing All Occurrences Algorithm

**Goal**: Remove every occurrence of a target value and optionally count or collect them.

```java
public List<String> removeAll(List<String> items, String target) {
    List<String> removed = new ArrayList<>();
    for (int i = items.size() - 1; i >= 0; i--) {
        if (items.get(i).equals(target)) {
            removed.add(items.remove(i));
        }
    }
    return removed;
}
```

* **Traverse backwards** (`size()-1` ↓ `0`) to avoid skipping after removals.
* Use `equals()` or `equalsIgnoreCase()` for strings; use `==`, `>`, `<` for wrapper types.
* To **count** removals, increment a counter instead of collecting.
* To support **partial matches**, replace `equals()` with `contains()` or `indexOf()` check.

---

## 7. Converting Array to ArrayList

```java
int[] arr = {5,3,1,8};
ArrayList<Integer> list = new ArrayList<>();
for (int x : arr) {
    list.add(x);
}
```

* Declare empty `ArrayList<Wrapper>` then **loop** through array, adding each element.

---

## 8. Key Tips

* Remember **zero-based** indices and dynamic sizing.
* Beware of **shifting** when adding/removing—indices change.
* Use correct **wrapper class** for primitive data.
* Prefer **backward traversal** for safe removal.
* Choose between `for` and **enhanced for** based on whether you need index control or modifications.

---

**Master these patterns** for AP CSA ArrayList questions!
