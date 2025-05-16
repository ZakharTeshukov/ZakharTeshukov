Before diving into the detailed criteria, here is a concise overview of the FRQ 2 scoring rubric for the 2024 AP Computer Science A exam:

* **Total points:** 9 points across 9 distinct rubric items (Points 1–9) ([AP Central][1])
* **Question focus:** Definition of a new class (`Scoreboard`) with appropriate instance variables, constructor, and two methods (`recordPlay` and `getScore`) implementing specified behaviors ([AP Central][1])
* **Scoring approach:** Award each of 9 points for presence and correctness of key class components or behaviors; apply up to 3 penalty points per question only in parts that have earned credit ([AP Central][1], [AP Central][2])

---

## Penalties and “No Penalty” List

* **Maximum penalties:** Up to 3 total per question, only in parts that have already earned credit ([AP Central][1])
* **1-point penalties include:** array/collection access confusion (`[]` vs. `get()`), extraneous side-effects (e.g. printing), undeclared locals, destruction of persistent data, or returning a value from a `void` method ([AP Central][1])
* **No penalty for minor issues** (e.g., missing semicolons/braces when intent is clear, unambiguous spelling/case discrepancies, or extraneous non-side-effect code) ([AP Central][1])

---

## Canonical Solution (Excerpt)

```java
public class Scoreboard {
  private String team1Name, team2Name;
  private int whoseTurn;
  private int score1, score2;

  public Scoreboard(String team1, String team2) {
    team1Name = team1;
    team2Name = team2;
    whoseTurn = 1;
    score1 = 0;
    score2 = 0;
  }

  public void recordPlay(int points) { … }

  public String getScore() { … }
}
```

([AP Central][1])

---

## Scoring Criteria and Decision Rules

| Point | Criterion                                                                              | Decision Rules & Common Errors                                                                                                                       |
| :---: | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | Declares class header `class Scoreboard`                                               | Must be `public class Scoreboard` or `class Scoreboard`; wrong classname/access loses point ([AP Central][1])                                        |
| **2** | Declares at least one `private String` and one `private int` instance variable         | Static or out-of-class declarations lose point; mis‐typed types lose point ([AP Central][1])                                                         |
| **3** | Declares `public Scoreboard(String, String)` and initializes both team-name variables  | Constructor must be `public`, correct name, and assign both parameters to instance fields ([AP Central][1])                                          |
| **4** | Declares method headers `public void recordPlay(int …)` and `public String getScore()` | Missing or incorrect headers (name, return type, parameters, or access) lose point ([AP Central][1])                                                 |
| **5** | `recordPlay` checks for parameter value of zero                                        | Must include `if (points == 0)` (or equivalent); failure to test zero loses point ([AP Central][1])                                                  |
| **6** | `recordPlay` increases at least one score instance variable                            | Must update either `score1` or `score2` when points > 0; omission loses point ([AP Central][1])                                                      |
| **7** | `recordPlay` switches active team when parameter is zero                               | Must toggle `whoseTurn` (or boolean flag) only when points == 0; incorrect placement loses point ([AP Central][1])                                   |
| **8** | `recordPlay` adds correct number of points to the active team’s score (algorithm)      | Must add exactly `points` to the proper score field; switching on positive or wrong field loses point ([AP Central][1])                              |
| **9** | `getScore` builds and returns the specified string                                     | Must return a `String` in format `score1–score2–<activeTeamName>` including both hyphens; printing or omitting hyphens loses point ([AP Central][1]) |

*Total for question 2: 9 points* ([AP Central][1])

---

This rubric reflects the official 2024 College Board scoring guidelines for AP Computer Science A FRQ 2, ensuring each element of the student’s class design and method implementation is evaluated precisely and consistently.

[1]: https://apcentral.collegeboard.org/media/pdf/ap24-apc-computer-science-a-q2.pdf "2024 Student Samples and Commentaries: AP Computer Science A - FRQ 2"
[2]: https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf?utm_source=chatgpt.com "[PDF] 2024 Scoring Guidelines - AP Computer Science A"
