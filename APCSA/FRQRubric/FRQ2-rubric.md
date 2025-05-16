Below is the **AP Computer Science A FRQ 2 scoring rubric** in Markdown format. Total points for Question 2: **9 points** ([AP Central][1])

---

## Scoring Criteria Decision Rules

1. **Class Header (1 pt)**
   Declare `public class Scoreboard`.
   *Responses will not earn the point if they declare the class as something other than `public`.* ([AP Central][1])

2. **Instance Variables (1 pt)**
   Declare at least one `private String` instance variable and one `private int` instance variable.
   *Responses will not earn the point if they declare any instance variable `static` or declare a variable outside the class.* ([AP Central][1])

3. **Constructor (1 pt)**
   Declare the constructor header

   ```java
   public Scoreboard(String team1, String team2)
   ```

   and initialize both team-name instance variables using the parameters.
   *Responses will not earn the point if they fail to declare or initialize instance variables for both team names, or if they declare the constructor as something other than `public`.* ([AP Central][1])

4. **Method Headers (1 pt)**
   Declare both of the following exactly as shown:

   ```java
   public void recordPlay(int points)
   public String getScore()
   ```

   *Responses will not earn the point if they use incorrect method names, omit or declare either method header incorrectly, omit `public`, or declare either method as something other than `public`.* ([AP Central][1])

5. **Zero-Check in `recordPlay` (1 pt)**
   In `recordPlay`, include a conditional that checks whether the parameter `points` equals 0.
   *Responses can still earn the point even if they use a method name that is recognizably equivalent.* ([AP Central][1])

6. **Score Update in `recordPlay` (1 pt)**
   In `recordPlay`, increase at least one declared instance variable representing one team’s score by the parameter value when `points` ≠ 0.
   *Responses can still earn the point even if they declare instance variables incorrectly, as long as they use the parameter to update an instance variable.* ([AP Central][1])

7. **Team Switch in `recordPlay` (1 pt)**
   In `recordPlay`, switch the active team (e.g., toggle whose turn it is) when `points` == 0.
   *Responses can still earn the point if they perform the switch in a method other than `recordPlay`, store the switched team in a local variable (as long as the switch occurs in both cases), or use a recognizably equivalent method name.* ([AP Central][1])

8. **Correct Point Addition (1 pt)**
   In `recordPlay`, add the correct number of points to the active team’s score (algorithmic correctness).
   *Responses will not earn the point if they switch teams when `points` > 0, fail to declare or change the active-team variable, or fail to add the parameter value.* ([AP Central][1])

9. **`getScore` Method (1 pt)**
   Build and return the specified string in the format

   ```
   "<score1>-<score2>-<teamName>"
   ```

   where `<teamName>` is the name of the active team.
   *Responses will not earn the point if they omit the literal hyphens or return an incorrect string.* ([AP Central][1])

---

### Total for Question 2: **9 points** ([AP Central][1])

[1]: https://apcentral.collegeboard.org/media/pdf/ap24-sg-computer-science-a.pdf "2024 Scoring Guidelines - AP Computer Science A"
