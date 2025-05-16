package practiceFRQs;

public class FRQ2_1_1 {

    private String title = "GoodBook";
    private String author = "GoodAuthor";
    private int pages = 350;

    public static void main(String[] args) {
        FRQ2_1_1 book = new FRQ2_1_1();
        book.longRead();
        book.getTitle();
        book.getAuthor();
        book.getPages();
    }

    public void longRead() {

        if (pages > 300) {
            System.out.println(true);
        } else {
            return;
        }

    }

    public void getTitle() {

        System.out.println(title);

    }

    public void getAuthor() {

        System.out.println(author);

    }

    public void getPages() {

        System.out.println(pages);

    }
}

/*
 * FRQ 2 – Class Design
 *
 * You will write a class called Book that keeps track of the title,
 * author, and the number of pages in the book. You will also write a method
 * that returns whether the book is considered a "long read"
 * (defined as having more than 300 pages).
 *
 * Requirements:
 *
 * 1. Declare private instance variables:
 * - title (a String)
 * - author (a String)
 * - pages (an int)
 *
 * 2. Write a constructor that takes the title, author, and number of pages
 * as parameters and initializes the instance variables.
 *
 * 3. Write accessor methods (getTitle, getAuthor, getPages) for all instance
 * variables.
 *
 * 4. Write a mutator method setPages that allows changing the number of pages.
 *
 * 5. Write a method isLongRead that returns true if the book has more than 300
 * pages,
 * and false otherwise.
 *
 *
 * Example Usage:
 *
 * Book b = new Book("War and Peace", "Leo Tolstoy", 1225);
 * 
 * System.out.println(b.getTitle()); // Output: War and Peace
 * 
 * System.out.println(b.isLongRead()); // Output: true
 * 
 * b.setPages(250);
 * 
 * System.out.println(b.isLongRead()); // Output: false
 */