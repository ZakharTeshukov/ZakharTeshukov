// FRQ2_1_2

package practiceFRQs;

public class FRQ2 {

    private String title;
    private String author;
    private int pages;

    public FRQ2(String title, String author, int pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String newTitle) {
        title = newTitle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String newAuthor) {
        author = newAuthor;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int newPages) {
        pages = newPages;
    }

    @Override
    public String toString() {
        return "Book [Title: " + title
                + ", Author: " + author
                + ", Pages: " + pages + "]";
    }

    public static void main(String[] args) {
        FRQ2 celcius = new FRQ2("Celcius", "Zakhar", 492);

        System.out.println(celcius.toString());
        System.out.println("Long read?" + celcius.isLongRead());
    }

    public boolean isLongRead() {
        return pages > 300;
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