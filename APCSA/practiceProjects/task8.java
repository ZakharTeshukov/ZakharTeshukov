// 8. Factorial (iterative): write a method factorial(int n) using a loop.

public class task8 {

    public static void main(String[] args) {
        int result = 1;
        int n = 6;
        for (int i = 1; i <= n; ++i) {
            result = result * i;
        }

        System.out.println(result);
    }
}