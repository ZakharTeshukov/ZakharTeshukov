// 7. Sum of first N integers using a for loop.

public class Task7 {

    private int number = 4;
    private int result = 0;

    // Corrected parameter type and added parameter name
    public void sumIntegers(int[] numbers) {

        for (int i = 1; i <= number; ++i) {
            result = result + i;
        }

        System.out.println(result);
    }

    // Added main method to run the code
    public static void main(String[] args) {
        Task7 task = new Task7();
        task.sumIntegers(new int[] {}); // Passing an empty array as the parameter is not used in the method
    }
}