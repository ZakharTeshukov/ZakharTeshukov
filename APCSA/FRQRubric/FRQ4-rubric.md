## Summary

FRQ 4 on the 2024 AP Computer Science A exam focuses on traversing a 2D array (`grid`) to determine successive locations and compute the sum along a path. It is scored out of **9 points**: Part (a) “getNextLoc” is worth **3 points**, and Part (b) “sumPath” is worth **6 points** ([AP Central][1]). A maximum of **3 penalty points** may be assessed per question, but only in parts that have earned credit ([AP Central][1]).

---

## Overall Penalties

Penalty points (1 point each) apply **only** in parts that have earned credit, up to 3 per question ([AP Central][1]).
Common 1-point penalties include:

* Array/collection access confusion (`[]` vs. `get()`) ([AP Central][1])
* Extraneous side-effect code (e.g., printing to output) ([AP Central][1])
* Local variables used but none declared ([AP Central][1])
* Destruction of persistent data (mutating parameters) ([AP Central][1])
* Void method returning a value ([AP Central][1])

*No penalties* for unambiguous spelling/case issues, missing semicolons/braces when intent is clear, or extraneous non–side-effect code ([AP Central][1]).

---

## Part (a): `public Location getNextLoc(int row, int col)` (3 points)

| Point | Criterion                                                                                                                        |
| :---: | :------------------------------------------------------------------------------------------------------------------------------- |
| **1** | Guards against out-of-bounds access for **any** returned `Location`.                                                             |
| **2** | Accesses both `grid[row][col+1]` and `grid[row+1][col]` (right and below elements).                                              |
| **3** | Returns the **correct** new `Location` in all four cases (bottom row wrap, rightmost column wrap, smaller of the two neighbors). |

1. **Guards against out-of-bounds access**: The method must include checks so that any `Location` returned has valid `row` and `col` indices within `grid` bounds ([AP Central][1]).
2. **Accesses both right and below elements**: The implementation must read `grid[row][col+1]` and `grid[row+1][col]` to compare values ([AP Central][1]).
3. **Returns correct `Location`**: Depending on whether at bottom row, rightmost column, or which neighbor is smaller, the method must return the appropriately constructed `Location` object with exactly one of the four cases handled ([AP Central][1]).

*Total for part (a): 3 points.*

---

## Part (b): `public int sumPath(int row, int col)` (6 points)

| Point | Criterion                                                                                                                       |
| :---: | :------------------------------------------------------------------------------------------------------------------------------ |
| **4** | Initializes and **increments** a `sum` variable to accumulate `grid` values.                                                    |
| **5** | Iteratively determines the path by repeatedly calling `getNextLoc` while **not** at the bottom-right corner (no bounds errors). |
| **6** | Calls `getNextLoc` within the context of a loop to advance the current position.                                                |
| **7** | Calls `getRow()` and `getCol()` on the returned `Location` object to update `row` and `col`.                                    |
| **8** | Accesses `grid[row][col]` at positions derived from successive `getNextLoc` calls.                                              |
| **9** | Computes the sum of **all** visited grid values including the **first** and **last** positions and returns that total.          |

4. **Initializes and increments `sum`**: Must declare `int sum = 0;` (or equivalent in recursion) and add each visited grid element to `sum` ([AP Central][1]).
5. **Determines path correctly**: Loop must continue while `(row < grid.length – 1 || col < grid[0].length – 1)` to visit all positions up to bottom-right without out-of-bounds access ([AP Central][1]).
6. **Calls `getNextLoc`**: Each iteration must invoke `getNextLoc(row, col)` on `this` (use of `this` optional) with two `int` parameters ([AP Central][1]).
7. **Uses `getRow()`/`getCol()`**: After obtaining a `Location`, the code must call `loc.getRow()` and `loc.getCol()` to update `row` and `col` ([AP Central][1]).
8. **Accesses grid at new positions**: Must read `grid[row][col]` based on the updated coordinates each time ([AP Central][1]).
9. **Computes full path sum**: The returned integer must equal the sum of all `grid` values along the path, including both starting and ending cells; failing to include either endpoint loses credit ([AP Central][1]).

*Total for part (b): 6 points.*
**Total for question 4: 9 points.**

[1]: https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf "2024 Scoring Guidelines - AP Computer Science A"
