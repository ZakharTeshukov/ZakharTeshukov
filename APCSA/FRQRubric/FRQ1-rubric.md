Before diving into the detailed point‐by‐point criteria, here’s a high‐level summary of the FRQ 1 rubric for the 2024 AP Computer Science A exam:

* **Total points:** 9 points (Part (a): 4 points; Part (b): 5 points) ([AP Central][1])
* **Question focus:** Methods and control structures involving simulation methods (`simulateOneDay`, `simulateManyDays`) ([AP Central][1])
* **Scoring approach:** Award points based on the presence and correctness of key algorithmic and structural elements; penalties (up to 3 per question) are applied only after points are earned ([AP Central][1])

---

## Overview of Scoring Criteria

The rubric is divided into two parts corresponding to the two methods students implement. For each part:

1. **Point‐by‐point criteria** specify exactly what feature or behavior must be in the student’s code to earn the point. ([AP Central][1])
2. **Decision rules** clarify allowable variations (e.g., off‐by‐one in comparisons, reversed comparison operators) and disallowed errors. ([AP Central][1])

No part may receive negative credit; penalty points (such as array‐access confusion or extraneous side‐effects) are only deducted in subparts that have already earned credit, with a maximum of 3 penalty points per question. ([AP Central][1])

---

## Part (a): `simulateOneDay` (4 points)

| Point | Criterion                                                                                                            |
| :---: | :------------------------------------------------------------------------------------------------------------------- |
|   1   | **Random value generation:**  At least one call to `Math.random()` to generate a random value.                       |
|   2   | **5% probability branch:**  Use a comparison of the random value against a constant to create a 5% case.             |
|   3   | **Random integer \[10, 50]:**  Cast and scale a random value to produce an integer uniformly in \[10, 50].           |
|   4   | **Food‐consumption logic:**  Multiply by `numBirds`, compare to `currentFood`, and subtract correctly in both cases. |

1. **Random value generation (1 point):**

   * Student must call `Math.random()` at least once. ([AP Central][1])
   * Even if they fail to use the generated value, the point can be earned; incorrect calls or omission of `Math.random()` disqualify. ([AP Central][1])

2. **5% probability branch (1 point):**

   * Code must implement two cases based on the random value (e.g., `if (condition < 0.05) … else …`). ([AP Central][1])
   * Variations (using `<=`, reversing 5%/95%, or slight casting differences) are acceptable provided the probability is correctly split. ([AP Central][1])

3. **Random integer \[10, 50] (1 point):**

   * Student must generate an integer in \[10, 50], typically via `(int)(Math.random()*41) + 10`. ([AP Central][1])
   * Off‐by‐one casting or incorrect call of `Math.random` disqualifies. ([AP Central][1])

4. **Food‐consumption logic (1 point):**

   * Code must compute `totalEaten = numBirds * eachBirdEats`, compare with `currentFood`, and update `currentFood` correctly in all cases. ([AP Central][1])
   * Acceptable even if comparisons use `<=`/`>=`, but reversing branches or allowing negative `currentFood` invalidates. ([AP Central][1])

---

## Part (b): `simulateManyDays` (5 points)

| Point | Criterion                                                                                                 |
| :---: | :-------------------------------------------------------------------------------------------------------- |
|   5   | **Call `simulateOneDay`:**  At least one correct invocation with the `numBirds` parameter.                |
|   6   | **Loop guard:**  Loop (e.g., `for` or `while`) runs at most `numDays` times and checks `currentFood > 0`. |
|   7   | **Day‐count algorithm:**  Correctly count the number of days simulated while food remains.                |
|   8   | **Food‐availability check:**  Compare `currentFood` to 0 within loop to determine continuation.           |
|   9   | **Return value:**  Return an `int` in all cases (either days simulated or `numDays`).                     |

5. **Call `simulateOneDay` (1 point):**

   * Must invoke `simulateOneDay(numBirds)` within the loop. ([AP Central][1])
   * Incorrect calls or calls on another object/class lose the point. ([AP Central][1])

6. **Loop guard (1 point):**

   * Loop must iterate no more than `numDays` times and guard against `currentFood == 0`. ([AP Central][1])
   * Variations in loop construct are allowed if logically equivalent. ([AP Central][1])

7. **Day‐count algorithm (1 point):**

   * Code must initialize and update a counter for days where food was available. ([AP Central][1])
   * Extra iterations are permissible if counter remains correct; failure to test or initialize counter loses credit. ([AP Central][1])

8. **Food‐availability check (1 point):**

   * Must compare `currentFood` to 0 inside loop to decide whether to continue simulation. ([AP Central][1])
   * Off‐by‐one in loop context is acceptable as long as comparison exists. ([AP Central][1])

9. **Return value (1 point):**

   * Must return an `int` (either the count or `numDays`). ([AP Central][1])
   * Returning a constant is acceptable if type correct. ([AP Central][1])

---

## Penalties and Common Errors

A maximum of **3 penalty points** may be assessed per question, **only** in parts that have earned credit. Common 1-point penalties:

* **Array/collection access confusion** (e.g., using `[]` vs. `get()`) ([AP Central][1])
* **Extraneous side-effect code** (e.g., printing, incorrect precondition) ([AP Central][1])
* **Undeclared local variables** (using variables without declaration) ([AP Central][1])
* **Destruction of persistent data** (modifying parameter references) ([AP Central][1])
* **Void method returning a value** ([AP Central][1])

**No Penalty** for minor issues with no side‐effects, such as:

* Case/spelling discrepancies when unambiguous ([AP Central][1])
* Use of `private`/`public` qualifier on local variables ([AP Central][1])
* Missing semicolons or braces when intent is clear ([AP Central][1])

---

This rubric aligns precisely with the official 2024 College Board scoring guidelines for AP Computer Science A FRQ 1, ensuring transparent and fair grading.

[1]: https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf "2024 Scoring Guidelines - AP Computer Science A"