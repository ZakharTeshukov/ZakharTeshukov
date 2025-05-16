## Summary

The 2024 AP Computer Science A FRQ 3 assesses students’ ability to traverse and manipulate a 1D `ArrayList<String>` through two methods:

* **Part (a)** `isWordChain()` (3 points) evaluates adjacency checks and substring searches.
* **Part (b)** `createList(String target)` (6 points) evaluates list construction, filtering, and element transformation.
  A maximum of **3 penalty points** may be assessed per question for side effects, undeclared variables, or collection‐access errors, but only after points are earned ([AP Central][1], [AP Central][2]).

---

## Overall Penalties

Penalty points (1 point each) apply **only** in parts that have earned credit, up to 3 per question.

* **Array/collection access confusion** (`[]` vs. `get()`) ([AP Central][1])
* **Extraneous side‐effect code** (e.g., printing) ([AP Central][1])
* **Undeclared local variables** ([AP Central][1])
* **Destruction of persistent data** (mutating parameters) ([AP Central][1])
* **Void method returning a value** ([AP Central][1])

*No penalties* are assessed for unambiguous spelling/case issues, missing semicolons/braces when intent is clear, or extraneous non–side‐effect code ([AP Central][1]).

---

## Part (a): `public boolean isWordChain()` (3 points)

| Point | Criterion & Decision Rules                                                                                                                                                                                          |
| :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1** | **Traverses all adjacent pairs** of `wordList` without bounds errors. <br>• May “return early” if a violation is found ⮕ still earn point if bounds correct ([AP Central][1]).                                      |
| **2** | **Checks containment**: uses `indexOf(previous)` to determine whether each string contains its predecessor. <br>• May use a single comparison or compare every element to the first ⮕ still earn ([AP Central][1]). |
| **3** | **Returns correct boolean**: `false` on first failed pair; `true` if all adjacent pairs satisfy the condition. <br>• Must use both `return true` and `return false` in appropriate contexts ([AP Central][1]).      |

*Total for part (a): 3 points* ([AP Central][1])

---

## Part (b): `public ArrayList<String> createList(String target)` (6 points)

| Point | Criterion & Decision Rules                                                                                                                                                                                                            |
| :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **4** | **Declares and constructs** an `ArrayList<String>` named (typically) `result`. <br>• Omission or wrong type (e.g., array) ⮕ no credit ([AP Central][1]).                                                                              |
| **5** | **Traverses all elements** of `wordList` without bounds errors. <br>• “Return early” is allowed if bounds remain correct ([AP Central][1]).                                                                                           |
| **6** | **Identifies strings that begin with* the parameter*\* (`current.indexOf(target) == 0`). <br>• Must guard against too-short strings or use equivalent `substring`-with-length check ([AP Central][1]).                                |
| **7** | **Constructs new String** by removing `target.length()` characters from the start of each matching element. <br>• Off-by-one or missing substring guard affects point 6 only ([AP Central][1]).                                       |
| **8** | **Adds at least one** correctly constructed `String` to `result` via `result.add(...)`. <br>• Must call `add` on the constructed list; wrong list or wrong method ⮕ no credit ([AP Central][1]).                                      |
| **9** | **Returns** the `ArrayList<String>` containing **all and only** appropriately revised strings, in the original order. <br>• No modification of `wordList`; no extra or missing elements; no early/misplaced return ([AP Central][1]). |

*Total for part (b): 6 points* ([AP Central][1])

---

This rubric is drawn directly from the 2024 College Board Scoring Guidelines for AP Computer Science A FRQ 3, ensuring precise alignment with official grading standards.

[1]: https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q3.pdf "2024 Student Samples and Commentaries: AP Computer Science A - FRQ 3"
[2]: https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf?utm_source=chatgpt.com "[PDF] 2024 Scoring Guidelines - AP Computer Science A"
